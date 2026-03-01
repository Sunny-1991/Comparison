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
const EQUITY_TARGETS = Object.freeze([
  {
    id: "equity_sp500",
    name: "权益类资产·标普500",
    legendName: "标普500",
    source: "Stooq（^SPX）",
    parser: "stooq",
    url: "https://stooq.com/q/d/l/?s=%5Espx&i=m",
  },
  {
    id: "equity_nasdaq100",
    name: "权益类资产·纳斯达克100",
    legendName: "纳斯达克100",
    source: "Stooq（^NDX）",
    parser: "stooq",
    url: "https://stooq.com/q/d/l/?s=%5Endx&i=m",
  },
  {
    id: "equity_csi300",
    name: "权益类资产·沪深300",
    legendName: "沪深300",
    source: "东方财富（沪深300）",
    parser: "eastmoney",
    url:
      "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=1.000300&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58&klt=103&fqt=0&beg=20080101&end=20500101",
  },
]);
const CASE_SHILLER_TARGETS = Object.freeze([
  {
    id: "us_cs_atxrsa",
    seriesId: "ATXRSA",
    name: "美国房产·亚特兰大都会区",
    legendName: "亚特兰大（Case-Shiller）",
  },
  {
    id: "us_cs_boxrsa",
    seriesId: "BOXRSA",
    name: "美国房产·波士顿都会区",
    legendName: "波士顿（Case-Shiller）",
  },
  {
    id: "us_cs_crxrsa",
    seriesId: "CRXRSA",
    name: "美国房产·夏洛特都会区",
    legendName: "夏洛特（Case-Shiller）",
  },
  {
    id: "us_cs_chxrsa",
    seriesId: "CHXRSA",
    name: "美国房产·芝加哥都会区",
    legendName: "芝加哥（Case-Shiller）",
  },
  {
    id: "us_cs_cexrsa",
    seriesId: "CEXRSA",
    name: "美国房产·克利夫兰都会区",
    legendName: "克利夫兰（Case-Shiller）",
  },
  {
    id: "us_cs_daxrsa",
    seriesId: "DAXRSA",
    name: "美国房产·达拉斯都会区",
    legendName: "达拉斯（Case-Shiller）",
  },
  {
    id: "us_cs_dnxrsa",
    seriesId: "DNXRSA",
    name: "美国房产·丹佛都会区",
    legendName: "丹佛（Case-Shiller）",
  },
  {
    id: "us_cs_dexrsa",
    seriesId: "DEXRSA",
    name: "美国房产·底特律都会区",
    legendName: "底特律（Case-Shiller）",
  },
  {
    id: "us_cs_lvxrsa",
    seriesId: "LVXRSA",
    name: "美国房产·拉斯维加斯都会区",
    legendName: "拉斯维加斯（Case-Shiller）",
  },
  {
    id: "us_cs_lxxrsa",
    seriesId: "LXXRSA",
    name: "美国房产·洛杉矶都会区",
    legendName: "洛杉矶（Case-Shiller）",
  },
  {
    id: "us_cs_mixrsa",
    seriesId: "MIXRSA",
    name: "美国房产·迈阿密都会区",
    legendName: "迈阿密（Case-Shiller）",
  },
  {
    id: "us_cs_mnxrsa",
    seriesId: "MNXRSA",
    name: "美国房产·明尼阿波利斯都会区",
    legendName: "明尼阿波利斯（Case-Shiller）",
  },
  {
    id: "us_cs_nyxrsa",
    seriesId: "NYXRSA",
    name: "美国房产·纽约都会区",
    legendName: "纽约（Case-Shiller）",
  },
  {
    id: "us_cs_phxrsa",
    seriesId: "PHXRSA",
    name: "美国房产·菲尼克斯都会区",
    legendName: "菲尼克斯（Case-Shiller）",
  },
  {
    id: "us_cs_poxrsa",
    seriesId: "POXRSA",
    name: "美国房产·波特兰都会区",
    legendName: "波特兰（Case-Shiller）",
  },
  {
    id: "us_cs_sdxrsa",
    seriesId: "SDXRSA",
    name: "美国房产·圣地亚哥都会区",
    legendName: "圣地亚哥（Case-Shiller）",
  },
  {
    id: "us_cs_sfxrsa",
    seriesId: "SFXRSA",
    name: "美国房产·旧金山都会区",
    legendName: "旧金山（Case-Shiller）",
  },
  {
    id: "us_cs_sexrsa",
    seriesId: "SEXRSA",
    name: "美国房产·西雅图都会区",
    legendName: "西雅图（Case-Shiller）",
  },
  {
    id: "us_cs_tpxrsa",
    seriesId: "TPXRSA",
    name: "美国房产·坦帕都会区",
    legendName: "坦帕（Case-Shiller）",
  },
  {
    id: "us_cs_wdxrsa",
    seriesId: "WDXRSA",
    name: "美国房产·华盛顿都会区",
    legendName: "华盛顿（Case-Shiller）",
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

function buildOhlcTuple(open, close, low, high, digits = 6) {
  const openValue = Number(open);
  const closeValue = Number(close);
  const lowValue = Number(low);
  const highValue = Number(high);
  if (
    !isFiniteNumber(openValue) ||
    !isFiniteNumber(closeValue) ||
    !isFiniteNumber(lowValue) ||
    !isFiniteNumber(highValue)
  ) {
    return null;
  }
  const normalizedLow = Math.min(lowValue, openValue, closeValue, highValue);
  const normalizedHigh = Math.max(highValue, openValue, closeValue, lowValue);
  return [
    toRoundedNumber(openValue, digits),
    toRoundedNumber(closeValue, digits),
    toRoundedNumber(normalizedLow, digits),
    toRoundedNumber(normalizedHigh, digits),
  ];
}

function getCloseFromOhlcTuple(tuple) {
  if (!Array.isArray(tuple) || tuple.length < 2) return null;
  const closeValue = Number(tuple[1]);
  return isFiniteNumber(closeValue) ? closeValue : null;
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
        chinaSourceKey: sourceKey,
        chinaSourceLabel: sourceName,
        source: city.source || sourceName,
        unit: "指数",
      });
    }
  }

  appendSource("centaline", "中原", "中原6城", centalineData);
  appendSource("nbs70", "统计局", "统计局70城", nbsData);

  return { assets, sourceSeriesByAssetId };
}

function caseShillerSeriesUrl(seriesId, startDate = "") {
  const url = new URL("https://fred.stlouisfed.org/graph/fredgraph.csv");
  url.searchParams.set("id", seriesId);
  if (startDate) {
    url.searchParams.set("cosd", startDate);
  }
  return url.toString();
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

function parseStooqCsvToMonthMap(csvText) {
  const monthValueMap = new Map();
  const lines = String(csvText || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .slice(1);
  for (const line of lines) {
    if (!line) continue;
    const cells = line.split(",");
    if (cells.length < 5) continue;
    const month = normalizeMonthToken(String(cells[0]).slice(0, 7));
    const closeValue = Number(cells[4]);
    if (!month || !isFiniteNumber(closeValue)) continue;
    monthValueMap.set(month, closeValue);
  }
  return monthValueMap;
}

function parseStooqCsvToMonthOhlcMap(csvText) {
  const monthOhlcMap = new Map();
  const lines = String(csvText || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .slice(1);
  for (const line of lines) {
    if (!line) continue;
    const cells = line.split(",");
    if (cells.length < 5) continue;
    const month = normalizeMonthToken(String(cells[0]).slice(0, 7));
    const tuple = buildOhlcTuple(cells[1], cells[4], cells[3], cells[2], 6);
    if (!month || !tuple) continue;
    monthOhlcMap.set(month, tuple);
  }
  return monthOhlcMap;
}

function buildStooqAsset(assetId, assetName, legendName, categoryKey, categoryLabel, sourceLabel, csvText) {
  const monthValueMap = parseStooqCsvToMonthMap(csvText);
  const monthOhlcMap = parseStooqCsvToMonthOhlcMap(csvText);

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
    ohlcMap: monthOhlcMap,
  };
}

function parseEastmoneyKlineToMonthMap(jsonText) {
  const monthValueMap = new Map();
  let parsed = null;
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    parsed = null;
  }
  const klines = parsed?.data?.klines;
  if (!Array.isArray(klines)) return monthValueMap;

  for (const row of klines) {
    const cells = String(row || "").split(",");
    if (cells.length < 3) continue;
    const month = normalizeMonthToken(String(cells[0]).slice(0, 7));
    const closeValue = Number(cells[2]);
    if (!month || !isFiniteNumber(closeValue)) continue;
    monthValueMap.set(month, closeValue);
  }

  return monthValueMap;
}

function parseEastmoneyKlineToMonthOhlcMap(jsonText) {
  const monthOhlcMap = new Map();
  let parsed = null;
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    parsed = null;
  }
  const klines = parsed?.data?.klines;
  if (!Array.isArray(klines)) return monthOhlcMap;

  for (const row of klines) {
    const cells = String(row || "").split(",");
    if (cells.length < 5) continue;
    const month = normalizeMonthToken(String(cells[0]).slice(0, 7));
    const tuple = buildOhlcTuple(cells[1], cells[2], cells[4], cells[3], 6);
    if (!month || !tuple) continue;
    monthOhlcMap.set(month, tuple);
  }

  return monthOhlcMap;
}

function buildEquityAssetFromEastmoney(target, jsonText) {
  const monthValueMap = parseEastmoneyKlineToMonthMap(jsonText);
  const monthOhlcMap = parseEastmoneyKlineToMonthOhlcMap(jsonText);
  if (monthValueMap.size === 0 && monthOhlcMap.size > 0) {
    monthOhlcMap.forEach((tuple, month) => {
      const closeValue = getCloseFromOhlcTuple(tuple);
      if (isFiniteNumber(closeValue)) {
        monthValueMap.set(month, closeValue);
      }
    });
  }

  return {
    asset: {
      id: target.id,
      name: target.name,
      legendName: target.legendName,
      categoryKey: "equities",
      categoryLabel: "权益类资产",
      subgroupKey: "equities",
      subgroupLabel: "权益类资产",
      source: target.source || "东方财富",
      unit: "指数",
    },
    seriesMap: monthValueMap,
    ohlcMap: monthOhlcMap,
  };
}

function mergeSeriesMaps(seriesMaps) {
  const merged = new Map();
  for (const [assetId, valueMap] of seriesMaps) {
    merged.set(assetId, valueMap);
  }
  return merged;
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return null;
  }
}

function stripGeneratedAt(data) {
  if (!data || typeof data !== "object") return null;
  const cloned = { ...data };
  delete cloned.generatedAt;
  return cloned;
}

function resolveGeneratedAt(nextData, previousData) {
  const previousPayload = stripGeneratedAt(previousData);
  const nextPayload = stripGeneratedAt(nextData);
  if (!previousPayload || !nextPayload) {
    return new Date().toISOString();
  }
  if (JSON.stringify(previousPayload) === JSON.stringify(nextPayload)) {
    const previousGeneratedAt = String(previousData.generatedAt || "").trim();
    if (previousGeneratedAt) return previousGeneratedAt;
  }
  return new Date().toISOString();
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
  console.log("Fetching equities data...");
  const equityPartList = [];
  for (const target of EQUITY_TARGETS) {
    if (!target.url) continue;
    if (target.parser === "stooq") {
      const csvText = await fetchText(target.url);
      const part = buildStooqAsset(
        target.id,
        target.name,
        target.legendName,
        "equities",
        "权益类资产",
        target.source || "Stooq",
        csvText,
      );
      part.asset.unit = "指数";
      equityPartList.push(part);
      continue;
    }
    if (target.parser === "eastmoney") {
      const jsonText = await fetchText(target.url);
      equityPartList.push(buildEquityAssetFromEastmoney(target, jsonText));
    }
  }

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

  const assets = [
    ...chinaPart.assets,
    ...usPart.assets,
    goldPart.asset,
    silverPart.asset,
    ...equityPartList.map((item) => item.asset),
  ];

  const sourceSeriesByAssetId = mergeSeriesMaps([
    ...chinaPart.sourceSeriesByAssetId.entries(),
    ...usPart.sourceSeriesByAssetId.entries(),
    [goldPart.asset.id, goldPart.seriesMap],
    [silverPart.asset.id, silverPart.seriesMap],
    ...equityPartList.map((item) => [item.asset.id, item.seriesMap]),
  ]);
  const sourceOhlcByAssetId = mergeSeriesMaps(
    equityPartList
      .filter((item) => item.ohlcMap instanceof Map && item.ohlcMap.size > 0)
      .map((item) => [item.asset.id, item.ohlcMap]),
  );

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
  const ohlcValues = {};

  for (const asset of assets) {
    const sourceMap = sourceSeriesByAssetId.get(asset.id) || new Map();
    const series = months.map((month) => {
      const value = Number(sourceMap.get(month));
      return isFiniteNumber(value) ? toRoundedNumber(value, 6) : null;
    });
    const range = buildAvailableRange(series, months);
    asset.availableRange = range;
    values[asset.id] = series;

    const sourceOhlcMap = sourceOhlcByAssetId.get(asset.id);
    if (sourceOhlcMap instanceof Map && sourceOhlcMap.size > 0) {
      const ohlcSeries = months.map((month) => {
        const tuple = sourceOhlcMap.get(month);
        if (!Array.isArray(tuple) || tuple.length < 4) return null;
        return buildOhlcTuple(tuple[0], tuple[1], tuple[2], tuple[3], 6);
      });
      if (ohlcSeries.some((tuple) => Array.isArray(tuple))) {
        ohlcValues[asset.id] = ohlcSeries;
      }
    }
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
      key: "equities",
      label: "权益类资产",
      description: "标普500、纳斯达克100、沪深300",
    },
  ];

  const outputData = {
    generatedAt: "",
    baseMonth: startMonth,
    dates: months,
    categories,
    assets,
    values,
    ohlcValues,
    sourceNotes: {
      china_centaline: "Wind / 中原研究中心（本地数据文件）",
      china_nbs: "国家统计局（本地链式数据文件）",
      us_housing: CASE_SHILLER_TARGETS.map((item) => caseShillerSeriesUrl(item.seriesId)),
      metals: "https://stooq.com",
      equities: EQUITY_TARGETS.map((item) => item.url),
    },
  };

  const previousOutputData = readJsonIfExists(outputJsonPath);
  outputData.generatedAt = resolveGeneratedAt(outputData, previousOutputData);

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
