#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const STOOQ_SERIES_URLS = Object.freeze({
  gold: "https://stooq.com/q/d/l/?s=xauusd&i=m",
  silver: "https://stooq.com/q/d/l/?s=xagusd&i=m",
});
const BINANCE_SERIES_URLS = Object.freeze({
  btc: "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&limit=1000",
  eth: "https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1M&limit=1000",
});
const CASE_SHILLER_TARGETS = Object.freeze([
  {
    id: "us_cs_nyxrsa",
    seriesId: "NYXRSA",
    name: "美国房产·纽约都会区",
    legendName: "纽约（Case-Shiller）",
  },
  {
    id: "us_cs_lxxrsa",
    seriesId: "LXXRSA",
    name: "美国房产·洛杉矶都会区",
    legendName: "洛杉矶（Case-Shiller）",
  },
  {
    id: "us_cs_chxrsa",
    seriesId: "CHXRSA",
    name: "美国房产·芝加哥都会区",
    legendName: "芝加哥（Case-Shiller）",
  },
  {
    id: "us_cs_daxrsa",
    seriesId: "DAXRSA",
    name: "美国房产·达拉斯都会区",
    legendName: "达拉斯（Case-Shiller）",
  },
  {
    id: "us_cs_mixrsa",
    seriesId: "MIXRSA",
    name: "美国房产·迈阿密都会区",
    legendName: "迈阿密（Case-Shiller）",
  },
  {
    id: "us_cs_sexrsa",
    seriesId: "SEXRSA",
    name: "美国房产·西雅图都会区",
    legendName: "西雅图（Case-Shiller）",
  },
]);

const DEFAULT_START_MONTH = "2008-01";
const DEFAULT_OUTPUT_FILENAME = "multi-asset-data.js";
const WINDOW_VAR_NAME = "MULTI_ASSET_SOURCE_DATA";

function normalizeMonthToken(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}$/.test(text)) return text;
  const matched = text.match(/^(\d{4})[-/](\d{1,2})$/);
  if (!matched) return "";
  return `${matched[1]}-${String(Number(matched[2])).padStart(2, "0")}`;
}

function currentMonthUtc() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

function enumerateMonths(startMonth, endMonth) {
  const [startYear, startM] = startMonth.split("-").map(Number);
  const [endYear, endM] = endMonth.split("-").map(Number);
  const months = [];
  let year = startYear;
  let month = startM;
  while (year < endYear || (year === endYear && month <= endM)) {
    months.push(`${year}-${String(month).padStart(2, "0")}`);
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return months;
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function toRoundedNumber(value, digits = 6) {
  if (!isFiniteNumber(value)) return null;
  return Number(value.toFixed(digits));
}

function buildAvailableRange(series, months) {
  let startIndex = -1;
  let endIndex = -1;
  for (let i = 0; i < series.length; i += 1) {
    if (isFiniteNumber(series[i])) {
      startIndex = i;
      break;
    }
  }
  for (let i = series.length - 1; i >= 0; i -= 1) {
    if (isFiniteNumber(series[i])) {
      endIndex = i;
      break;
    }
  }
  if (startIndex < 0 || endIndex < 0 || startIndex > endIndex) return "";
  return `${months[startIndex]}:${months[endIndex]}`;
}

function getLatestMonthWithData(seriesById) {
  let latest = "";
  for (const monthValueMap of seriesById.values()) {
    for (const month of monthValueMap.keys()) {
      if (!latest || month > latest) latest = month;
    }
  }
  return latest;
}

function runCurl(args, envOverrides = null) {
  const env = envOverrides ? { ...process.env, ...envOverrides } : process.env;
  return execFileSync("curl", args, {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 128,
    env,
  });
}

async function fetchText(url) {
  if (typeof fetch === "function") {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "*/*",
          "User-Agent": "Mozilla/5.0 (compatible; data-script/1.0)",
        },
      });
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      // continue to curl fallback
    }
  }

  const attempts = [
    () => runCurl(["-L", "-sS", url]),
    () =>
      runCurl(["-L", "-sS", url], {
        HTTP_PROXY: "",
        HTTPS_PROXY: "",
        ALL_PROXY: "",
        http_proxy: "",
        https_proxy: "",
        all_proxy: "",
      }),
    () =>
      runCurl(["--noproxy", "*", "-L", "-sS", url], {
        HTTP_PROXY: "",
        HTTPS_PROXY: "",
        ALL_PROXY: "",
        http_proxy: "",
        https_proxy: "",
        all_proxy: "",
      }),
  ];

  let lastError = null;
  for (const attempt of attempts) {
    try {
      return attempt();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`Failed to fetch ${url}`);
}

function loadWindowData(filePath, variableName) {
  const script = fs.readFileSync(filePath, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(script, context);
  const data = context.window?.[variableName];
  if (!data) {
    throw new Error(`Cannot read ${variableName} from ${filePath}`);
  }
  return data;
}

function buildChinaHousingAssets(centalineData, nbsData) {
  const assets = [];
  const sourceSeriesByAssetId = new Map();

  function appendSource(sourceKey, sourceLabel, sourceName, sourceData) {
    for (const city of sourceData.cities || []) {
      const series = sourceData.values?.[city.id];
      if (!Array.isArray(series)) continue;
      const assetId = `cn_${sourceKey}_${city.id}`;
      const monthValueMap = new Map();
      sourceData.dates.forEach((month, index) => {
        const value = Number(series[index]);
        if (isFiniteNumber(value)) {
          monthValueMap.set(month, value);
        }
      });
      sourceSeriesByAssetId.set(assetId, monthValueMap);
      assets.push({
        id: assetId,
        name: `中国房产·${sourceName}·${city.name}`,
        legendName: `${city.name}（${sourceLabel}）`,
        categoryKey: "cn_housing",
        categoryLabel: "中国房产",
        subgroupKey: sourceKey,
        subgroupLabel: `中国房产（${sourceName}）`,
        source: city.source || sourceName,
        unit: "指数",
      });
    }
  }

  appendSource("centaline", "中原", "中原6城", centalineData);
  appendSource("nbs70", "统计局", "统计局70城", nbsData);

  return { assets, sourceSeriesByAssetId };
}

function caseShillerSeriesUrl(seriesId) {
  return `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}`;
}

function parseCaseShillerCsv(csvText) {
  const monthValueMap = new Map();
  const lines = String(csvText || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .slice(1);
  for (const line of lines) {
    if (!line) continue;
    const cells = line.split(",");
    if (cells.length < 2) continue;
    const month = normalizeMonthToken(String(cells[0]).slice(0, 7));
    const value = Number(cells[1]);
    if (!month || !isFiniteNumber(value)) continue;
    monthValueMap.set(month, value);
  }
  return monthValueMap;
}

function buildCaseShillerAssets(caseShillerCsvBySeriesId) {
  const assets = [];
  const sourceSeriesByAssetId = new Map();

  for (const target of CASE_SHILLER_TARGETS) {
    const csvText = caseShillerCsvBySeriesId.get(target.seriesId) || "";
    const seriesMap = parseCaseShillerCsv(csvText);
    sourceSeriesByAssetId.set(target.id, seriesMap);
    assets.push({
      id: target.id,
      name: target.name,
      legendName: target.legendName,
      categoryKey: "us_housing",
      categoryLabel: "美国房产",
      subgroupKey: "us_case_shiller",
      subgroupLabel: "美国房产（Case-Shiller）",
      source: `S&P CoreLogic Case-Shiller（${target.seriesId}）`,
      unit: "指数",
    });
  }

  return { assets, sourceSeriesByAssetId };
}

function buildStooqAsset(assetId, assetName, legendName, categoryKey, categoryLabel, sourceLabel, csvText) {
  const monthValueMap = new Map();
  const lines = String(csvText || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .slice(1);
  for (const line of lines) {
    const cells = line.split(",");
    if (cells.length < 5) continue;
    const month = normalizeMonthToken(String(cells[0]).slice(0, 7));
    const closeValue = Number(cells[4]);
    if (!month || !isFiniteNumber(closeValue)) continue;
    monthValueMap.set(month, closeValue);
  }

  return {
    asset: {
      id: assetId,
      name: assetName,
      legendName,
      categoryKey,
      categoryLabel,
      subgroupKey: categoryKey,
      subgroupLabel: categoryLabel,
      source: sourceLabel,
      unit: "美元",
    },
    seriesMap: monthValueMap,
  };
}

function buildBinanceAsset(assetId, assetName, legendName, categoryKey, categoryLabel, sourceLabel, jsonText) {
  const monthValueMap = new Map();
  let parsed = [];
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    parsed = [];
  }
  if (!Array.isArray(parsed)) parsed = [];

  for (const row of parsed) {
    if (!Array.isArray(row) || row.length < 5) continue;
    const openTime = Number(row[0]);
    const closeValue = Number(row[4]);
    if (!Number.isFinite(openTime) || !isFiniteNumber(closeValue)) continue;
    const date = new Date(openTime);
    const month = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    monthValueMap.set(month, closeValue);
  }

  return {
    asset: {
      id: assetId,
      name: assetName,
      legendName,
      categoryKey,
      categoryLabel,
      subgroupKey: categoryKey,
      subgroupLabel: categoryLabel,
      source: sourceLabel,
      unit: "美元",
    },
    seriesMap: monthValueMap,
  };
}

function mergeSeriesMaps(seriesMaps) {
  const merged = new Map();
  for (const [assetId, valueMap] of seriesMaps) {
    merged.set(assetId, valueMap);
  }
  return merged;
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootDir = path.resolve(__dirname, "..");

  const outputPathArg = process.argv[2] || path.resolve(rootDir, DEFAULT_OUTPUT_FILENAME);
  const outputJsPath = path.isAbsolute(outputPathArg)
    ? outputPathArg
    : path.resolve(process.cwd(), outputPathArg);
  const outputJsonPath = outputJsPath.replace(/\.js$/i, ".json");

  const startMonth = normalizeMonthToken(process.env.MULTI_ASSET_START_MONTH) || DEFAULT_START_MONTH;
  const nowMonth = currentMonthUtc();

  // eslint-disable-next-line no-console
  console.log("Loading local China housing sources...");
  const centalineData = loadWindowData(path.resolve(rootDir, "house-price-data.js"), "HOUSE_PRICE_SOURCE_DATA");
  const nbsData = loadWindowData(path.resolve(rootDir, "house-price-data-nbs-70.js"), "HOUSE_PRICE_SOURCE_DATA_NBS_70");

  // eslint-disable-next-line no-console
  console.log("Fetching Case-Shiller city data...");
  const caseShillerCsvBySeriesId = new Map();
  for (const target of CASE_SHILLER_TARGETS) {
    const csvText = await fetchText(caseShillerSeriesUrl(target.seriesId));
    caseShillerCsvBySeriesId.set(target.seriesId, csvText);
  }

  // eslint-disable-next-line no-console
  console.log("Fetching metals data...");
  const goldCsv = await fetchText(STOOQ_SERIES_URLS.gold);
  const silverCsv = await fetchText(STOOQ_SERIES_URLS.silver);

  // eslint-disable-next-line no-console
  console.log("Fetching crypto data...");
  const btcJson = await fetchText(BINANCE_SERIES_URLS.btc);
  const ethJson = await fetchText(BINANCE_SERIES_URLS.eth);

  const chinaPart = buildChinaHousingAssets(centalineData, nbsData);
  const usPart = buildCaseShillerAssets(caseShillerCsvBySeriesId);

  const goldPart = buildStooqAsset(
    "metal_gold_spot_usd",
    "贵金属·黄金现货（USD）",
    "黄金（USD）",
    "metals",
    "贵金属",
    "Stooq",
    goldCsv,
  );
  const silverPart = buildStooqAsset(
    "metal_silver_spot_usd",
    "贵金属·白银现货（USD）",
    "白银（USD）",
    "metals",
    "贵金属",
    "Stooq",
    silverCsv,
  );
  const btcPart = buildBinanceAsset(
    "crypto_btc_usd",
    "加密资产·比特币（BTC/USD）",
    "比特币",
    "crypto",
    "加密资产",
    "Binance",
    btcJson,
  );
  const ethPart = buildBinanceAsset(
    "crypto_eth_usd",
    "加密资产·以太坊（ETH/USD）",
    "以太坊",
    "crypto",
    "加密资产",
    "Binance",
    ethJson,
  );

  const assets = [
    ...chinaPart.assets,
    ...usPart.assets,
    goldPart.asset,
    silverPart.asset,
    btcPart.asset,
    ethPart.asset,
  ];

  const sourceSeriesByAssetId = mergeSeriesMaps([
    ...chinaPart.sourceSeriesByAssetId.entries(),
    ...usPart.sourceSeriesByAssetId.entries(),
    [goldPart.asset.id, goldPart.seriesMap],
    [silverPart.asset.id, silverPart.seriesMap],
    [btcPart.asset.id, btcPart.seriesMap],
    [ethPart.asset.id, ethPart.seriesMap],
  ]);

  const latestMonthBySources = [
    centalineData?.dates?.[centalineData.dates.length - 1] || "",
    nbsData?.dates?.[nbsData.dates.length - 1] || "",
    getLatestMonthWithData(sourceSeriesByAssetId),
  ].filter(Boolean);

  let endMonth = startMonth;
  for (const month of latestMonthBySources) {
    if (!endMonth || month > endMonth) endMonth = month;
  }
  if (endMonth > nowMonth) endMonth = nowMonth;

  const months = enumerateMonths(startMonth, endMonth);
  const values = {};

  for (const asset of assets) {
    const sourceMap = sourceSeriesByAssetId.get(asset.id) || new Map();
    const series = months.map((month) => {
      const value = Number(sourceMap.get(month));
      return isFiniteNumber(value) ? toRoundedNumber(value, 6) : null;
    });
    const range = buildAvailableRange(series, months);
    asset.availableRange = range;
    values[asset.id] = series;
  }

  const categories = [
    {
      key: "cn_housing",
      label: "中国房产",
      description: "中原6城 + 统计局70城",
    },
    {
      key: "us_housing",
      label: "美国房产",
      description: "Case-Shiller 城市月度指数",
    },
    {
      key: "metals",
      label: "贵金属",
      description: "黄金、白银",
    },
    {
      key: "crypto",
      label: "加密资产",
      description: "比特币、以太坊",
    },
  ];

  const outputData = {
    generatedAt: new Date().toISOString(),
    baseMonth: startMonth,
    dates: months,
    categories,
    assets,
    values,
    sourceNotes: {
      china_centaline: "Wind / 中原研究中心（本地数据文件）",
      china_nbs: "国家统计局（本地链式数据文件）",
      us_housing: CASE_SHILLER_TARGETS.map((item) => caseShillerSeriesUrl(item.seriesId)),
      metals: "https://stooq.com",
      crypto: "https://api.binance.com",
    },
  };

  fs.writeFileSync(outputJsonPath, `${JSON.stringify(outputData, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputJsPath, `window.${WINDOW_VAR_NAME} = ${JSON.stringify(outputData, null, 2)};\n`, "utf8");

  // eslint-disable-next-line no-console
  console.log(`Saved ${outputJsPath}`);
  // eslint-disable-next-line no-console
  console.log(`Saved ${outputJsonPath}`);
  // eslint-disable-next-line no-console
  console.log(`Months: ${months[0]} -> ${months[months.length - 1]} (${months.length})`);
  // eslint-disable-next-line no-console
  console.log(`Assets: ${assets.length}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});
