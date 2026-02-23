const THEME_MODE_STORAGE_KEY = "house-price-theme-mode";
const THEME_MODE_LIGHT = "light";
const THEME_MODE_DARK = "dark";
const MAX_SELECTED_ASSET_COUNT = 6;
const BASE_START_MONTH = "2008-01";
const CHART_FONT_FAMILY = '"STKaiti", "Kaiti SC", "KaiTi", "BiauKai", serif';

const CASE_SHILLER_SERIES = Object.freeze([
  { id: "us_cs_nyxrsa", seriesId: "NYXRSA", name: "美国房产·纽约都会区", legendName: "纽约（Case-Shiller）" },
  { id: "us_cs_lxxrsa", seriesId: "LXXRSA", name: "美国房产·洛杉矶都会区", legendName: "洛杉矶（Case-Shiller）" },
  { id: "us_cs_chxrsa", seriesId: "CHXRSA", name: "美国房产·芝加哥都会区", legendName: "芝加哥（Case-Shiller）" },
  { id: "us_cs_daxrsa", seriesId: "DAXRSA", name: "美国房产·达拉斯都会区", legendName: "达拉斯（Case-Shiller）" },
  { id: "us_cs_mixrsa", seriesId: "MIXRSA", name: "美国房产·迈阿密都会区", legendName: "迈阿密（Case-Shiller）" },
  { id: "us_cs_sexrsa", seriesId: "SEXRSA", name: "美国房产·西雅图都会区", legendName: "西雅图（Case-Shiller）" },
]);

const METAL_SERIES = Object.freeze([
  { id: "metal_gold_spot_usd", seriesId: "GOLDAMGBD228NLBM", name: "贵金属·黄金现货（USD）", legendName: "黄金（USD）" },
  { id: "metal_silver_spot_usd", seriesId: "SLVPRUSD", name: "贵金属·白银现货（USD）", legendName: "白银（USD）" },
]);

const CRYPTO_SERIES = Object.freeze([
  {
    id: "crypto_btc_usd",
    name: "加密资产·比特币（BTC/USD）",
    legendName: "比特币",
    url: "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&limit=1000",
  },
  {
    id: "crypto_eth_usd",
    name: "加密资产·以太坊（ETH/USD）",
    legendName: "以太坊",
    url: "https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1M&limit=1000",
  },
]);

const SUBGROUP_ORDER = Object.freeze([
  "中国房产（中原6城）",
  "中国房产（统计局70城）",
  "美国房产（Case-Shiller）",
  "贵金属",
  "加密资产",
]);

const CHART_THEME_STYLES = Object.freeze({
  [THEME_MODE_LIGHT]: Object.freeze({
    chartBackground: "#fbfeff",
    chartTextColor: "#1d435d",
    legendTextColor: "#22516d",
    xAxisLineColor: "#7c97ac",
    xAxisLabelColor: "#315d79",
    yAxisLineColor: "#4d7596",
    yAxisLabelColor: "#2f5874",
    sliderHandleColor: "rgba(255, 255, 255, 0.82)",
    sliderHandleBorderColor: "rgba(26, 143, 227, 0.84)",
    sliderHandleHoverColor: "rgba(255, 255, 255, 0.95)",
    sliderHandleHoverBorderColor: "rgba(26, 143, 227, 0.95)",
    tooltipBackground: "rgba(248, 253, 255, 0.98)",
    tooltipBorderColor: "rgba(150, 181, 203, 0.96)",
    tooltipTextColor: "#23506c",
    tooltipAxisPointerColor: "rgba(95, 129, 153, 0.9)",
    tooltipExtraCssText:
      "border-radius:8px;box-shadow:0 12px 26px rgba(20,48,74,.22);backdrop-filter:blur(2px);",
  }),
  [THEME_MODE_DARK]: Object.freeze({
    chartBackground: "#09131b",
    chartTextColor: "#dde7ee",
    legendTextColor: "#e2ebf2",
    xAxisLineColor: "#8da5b5",
    xAxisLabelColor: "#c7d6e0",
    yAxisLineColor: "#9ab1bf",
    yAxisLabelColor: "#d2dee7",
    sliderHandleColor: "rgba(245, 164, 59, 0.4)",
    sliderHandleBorderColor: "rgba(245, 164, 59, 0.95)",
    sliderHandleHoverColor: "rgba(255, 192, 105, 0.5)",
    sliderHandleHoverBorderColor: "rgba(255, 192, 105, 0.99)",
    tooltipBackground: "rgba(9, 17, 24, 0.97)",
    tooltipBorderColor: "rgba(245, 164, 59, 0.62)",
    tooltipTextColor: "#dde9f2",
    tooltipAxisPointerColor: "rgba(245, 164, 59, 0.86)",
    tooltipExtraCssText:
      "border-radius:8px;box-shadow:0 18px 36px rgba(0,0,0,.56);backdrop-filter:blur(2px);",
  }),
});

const SERIES_COLORS = Object.freeze({
  [THEME_MODE_LIGHT]: [
    "#2d7bd2",
    "#f08a24",
    "#2f9a7f",
    "#8d6ad6",
    "#3b90b6",
    "#cf5f5f",
    "#5698ff",
    "#e3a431",
    "#2eb48a",
    "#a47be5",
    "#4594d9",
    "#c8659e",
  ],
  [THEME_MODE_DARK]: [
    "#7ec8ff",
    "#ffb65a",
    "#80d9b6",
    "#c2a2ff",
    "#83d7f8",
    "#ff8f8a",
    "#95ccff",
    "#ffd07b",
    "#8ddbbf",
    "#ceb7ff",
    "#9cd8ff",
    "#f29ec0",
  ],
});

const themeModeEl = document.getElementById("themeMode");
const assetListEl = document.getElementById("assetList");
const assetSearchEl = document.getElementById("assetSearch");
const startMonthEl = document.getElementById("startMonth");
const endMonthEl = document.getElementById("endMonth");
const renderBtn = document.getElementById("renderBtn");
const selectAllBtn = document.getElementById("selectAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const statusEl = document.getElementById("statusText");
const summaryBodyEl = document.getElementById("summaryBody");
const chartTitleEl = document.getElementById("chartTitle");
const chartMetaEl = document.getElementById("chartMeta");
const footnoteEl = document.getElementById("footnoteText");
const chartEl = document.getElementById("chart");

const chart = echarts.init(chartEl, null, {
  renderer: "canvas",
});

const assetById = new Map();
let raw = null;
let latestRenderContext = null;
let isApplyingOption = false;
let isSyncingRangeFromSlider = false;
let dataZoomSyncTimer = null;
let pendingZoomPayload = null;

const uiState = {
  hiddenAssetNames: new Set(),
  zoomStartMonth: null,
  zoomEndMonth: null,
};

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeMonthToken(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}$/.test(text)) return text;
  const matched = text.match(/^(\d{4})[-/.](\d{1,2})$/);
  if (!matched) return text;
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

function formatMonthZh(month) {
  const token = normalizeMonthToken(month);
  const matched = token.match(/^(\d{4})-(\d{2})$/);
  if (!matched) return token;
  return `${matched[1]}年${Number(matched[2])}月`;
}

function formatMonthDot(month) {
  const token = normalizeMonthToken(month);
  const matched = token.match(/^(\d{4})-(\d{2})$/);
  if (!matched) return token;
  return `${matched[1]}.${matched[2]}`;
}

function formatNumber(value, digits = 1) {
  if (!isFiniteNumber(value)) return "-";
  return Number(value).toFixed(digits);
}

function formatPercent(value, digits = 1) {
  if (!isFiniteNumber(value)) return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

function calcPctChange(currentValue, previousValue) {
  if (!isFiniteNumber(currentValue) || !isFiniteNumber(previousValue) || previousValue === 0) {
    return null;
  }
  return ((currentValue / previousValue) - 1) * 100;
}

function getLastFiniteIndex(series) {
  if (!Array.isArray(series)) return -1;
  for (let i = series.length - 1; i >= 0; i -= 1) {
    if (isFiniteNumber(series[i])) return i;
  }
  return -1;
}

function getLastFiniteInfo(series, months) {
  const index = getLastFiniteIndex(series);
  if (index < 0) return { value: null, date: null };
  return {
    value: series[index],
    date: months[index] || null,
  };
}

function normalizeThemeMode(value) {
  return value === THEME_MODE_DARK ? THEME_MODE_DARK : THEME_MODE_LIGHT;
}

function readStoredThemeMode() {
  try {
    return normalizeThemeMode(window.localStorage.getItem(THEME_MODE_STORAGE_KEY));
  } catch (error) {
    return THEME_MODE_LIGHT;
  }
}

function getCurrentThemeMode() {
  const mode = document.body?.dataset?.theme;
  return normalizeThemeMode(mode);
}

function getActiveChartThemeStyle() {
  return CHART_THEME_STYLES[getCurrentThemeMode()] || CHART_THEME_STYLES[THEME_MODE_LIGHT];
}

function applyThemeMode(nextMode, { persist = true, rerender = true } = {}) {
  const mode = normalizeThemeMode(nextMode);
  if (document.body) {
    document.body.dataset.theme = mode;
    document.body.classList.toggle("theme-dark", mode === THEME_MODE_DARK);
  }
  if (themeModeEl && themeModeEl.value !== mode) {
    themeModeEl.value = mode;
  }
  if (persist) {
    try {
      window.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
    } catch (error) {
      // ignore storage failure
    }
  }
  if (rerender && raw) {
    render();
  }
}

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle("error", isError);
}

function downloadByDataURL(dataURL, filename) {
  const anchor = document.createElement("a");
  anchor.href = dataURL;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

async function exportCurrentChartImage(pixelRatio = 2, label = "标准清晰") {
  if (!latestRenderContext) {
    setStatus("暂无可导出的图表，请先生成。", true);
    return;
  }
  const chartTheme = getActiveChartThemeStyle();
  const dataUrl = chart.getDataURL({
    type: "png",
    pixelRatio,
    backgroundColor: chartTheme.chartBackground,
    excludeComponents: ["toolbox", "dataZoom"],
  });
  const suffix = pixelRatio >= 4 ? "-ultra-hd" : "";
  const filename = `multi-asset-base100-${latestRenderContext.startMonth}-to-${latestRenderContext.endMonth}${suffix}.png`;
  downloadByDataURL(dataUrl, filename);
  setStatus(`图片已导出（${label}）。`, false);
}

function toFiniteNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function resolveAxisMonthFromPercent(percent, axisData) {
  if (!Array.isArray(axisData) || axisData.length === 0) return "";
  const safePercent = Number.isFinite(percent) ? Math.max(0, Math.min(100, percent)) : 0;
  const index = Math.round((safePercent / 100) * (axisData.length - 1));
  return normalizeMonthToken(axisData[index]);
}

function getZoomPayload(event) {
  if (event && Array.isArray(event.batch) && event.batch.length > 0) {
    return event.batch[event.batch.length - 1] || null;
  }
  return event || null;
}

function buildAvailableRange(series, months) {
  let first = -1;
  let last = -1;
  for (let i = 0; i < series.length; i += 1) {
    if (isFiniteNumber(series[i])) {
      first = i;
      break;
    }
  }
  for (let i = series.length - 1; i >= 0; i -= 1) {
    if (isFiniteNumber(series[i])) {
      last = i;
      break;
    }
  }
  if (first < 0 || last < 0 || first > last) return "";
  return `${months[first]}:${months[last]}`;
}

function parseFredCsvToMonthMap(csvText) {
  const monthValueMap = new Map();
  const lines = String(csvText || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .filter(Boolean);

  const headerIndex = lines.findIndex((line) => line.toLowerCase().startsWith("observation_date,"));
  if (headerIndex < 0) return monthValueMap;

  for (let i = headerIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    const commaIndex = line.indexOf(",");
    if (commaIndex < 0) continue;
    const dateText = line.slice(0, commaIndex).trim();
    const valueText = line.slice(commaIndex + 1).trim();
    const month = normalizeMonthToken(dateText.slice(0, 7));
    const value = Number(valueText);
    if (!month || !isFiniteNumber(value)) continue;
    monthValueMap.set(month, value);
  }

  return monthValueMap;
}

function parseBinanceKlinesToMonthMap(jsonText) {
  const monthValueMap = new Map();
  let parsed = [];
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    parsed = [];
  }
  if (!Array.isArray(parsed)) return monthValueMap;

  for (const row of parsed) {
    if (!Array.isArray(row) || row.length < 5) continue;
    const openTime = Number(row[0]);
    const close = Number(row[4]);
    if (!Number.isFinite(openTime) || !isFiniteNumber(close)) continue;
    const date = new Date(openTime);
    const month = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    monthValueMap.set(month, close);
  }

  return monthValueMap;
}

function stripUrlProtocol(url) {
  return String(url || "").replace(/^https?:\/\//i, "");
}

async function fetchTextWithTimeout(url, timeoutMs = 18000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchTextResilient(url) {
  const candidates = [
    url,
    `https://r.jina.ai/http://${stripUrlProtocol(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://cors.isomorphic-git.org/${url}`,
  ];

  let lastError = null;
  for (const candidate of candidates) {
    try {
      const text = await fetchTextWithTimeout(candidate, 20000);
      if (String(text || "").trim().length > 0) {
        return text;
      }
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`fetch failed: ${url}`);
}

function caseShillerSeriesUrl(seriesId) {
  return `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}`;
}

function buildChinaSourceAssets(sourceData, { sourceKey, sourceName, sourceLabel }) {
  const assets = [];
  const seriesById = new Map();
  for (const city of sourceData.cities || []) {
    const series = sourceData.values?.[city.id];
    if (!Array.isArray(series)) continue;
    const assetId = `cn_${sourceKey}_${city.id}`;
    const map = new Map();
    sourceData.dates.forEach((month, index) => {
      const value = Number(series[index]);
      if (isFiniteNumber(value)) {
        map.set(month, value);
      }
    });
    seriesById.set(assetId, map);
    assets.push({
      id: assetId,
      name: `中国房产·${sourceName}·${city.name}`,
      legendName: `${city.name}（${sourceLabel}）`,
      categoryKey: "cn_housing",
      categoryLabel: "中国房产",
      subgroupLabel: `中国房产（${sourceName}）`,
      source: city.source || sourceName,
      unit: "指数",
    });
  }
  return { assets, seriesById };
}

function pickDefaultAssets(assetList) {
  const preferredKeys = ["北京", "上海", "纽约", "洛杉矶", "黄金", "比特币"];
  const selected = [];

  preferredKeys.forEach((keyword) => {
    const matched = assetList.find((asset) => asset.name.includes(keyword) && !selected.includes(asset.id));
    if (matched) {
      selected.push(matched.id);
    }
  });

  if (selected.length < MAX_SELECTED_ASSET_COUNT) {
    for (const asset of assetList) {
      if (selected.length >= MAX_SELECTED_ASSET_COUNT) break;
      if (!selected.includes(asset.id)) {
        selected.push(asset.id);
      }
    }
  }

  return new Set(selected.slice(0, MAX_SELECTED_ASSET_COUNT));
}

async function buildMultiAssetDataset() {
  const warnings = [];
  const assets = [];
  const seriesById = new Map();

  if (window.HOUSE_PRICE_SOURCE_DATA && window.HOUSE_PRICE_SOURCE_DATA_NBS_70) {
    const centalinePart = buildChinaSourceAssets(window.HOUSE_PRICE_SOURCE_DATA, {
      sourceKey: "centaline",
      sourceName: "中原6城",
      sourceLabel: "中原",
    });
    const nbsPart = buildChinaSourceAssets(window.HOUSE_PRICE_SOURCE_DATA_NBS_70, {
      sourceKey: "nbs70",
      sourceName: "统计局70城",
      sourceLabel: "统计局",
    });

    assets.push(...centalinePart.assets, ...nbsPart.assets);
    centalinePart.seriesById.forEach((value, key) => seriesById.set(key, value));
    nbsPart.seriesById.forEach((value, key) => seriesById.set(key, value));
  } else {
    warnings.push("中国房产本地数据缺失，无法加载中原/统计局资产。");
  }

  const caseShillerTasks = CASE_SHILLER_SERIES.map(async (target) => {
    try {
      const csvText = await fetchTextResilient(caseShillerSeriesUrl(target.seriesId));
      const map = parseFredCsvToMonthMap(csvText);
      if (map.size === 0) {
        throw new Error("empty-series");
      }
      assets.push({
        id: target.id,
        name: target.name,
        legendName: target.legendName,
        categoryKey: "us_housing",
        categoryLabel: "美国房产",
        subgroupLabel: "美国房产（Case-Shiller）",
        source: `S&P CoreLogic Case-Shiller（${target.seriesId}）`,
        unit: "指数",
      });
      seriesById.set(target.id, map);
    } catch (error) {
      warnings.push(`${target.legendName} 加载失败。`);
    }
  });

  const metalTasks = METAL_SERIES.map(async (target) => {
    try {
      const csvText = await fetchTextResilient(caseShillerSeriesUrl(target.seriesId));
      const map = parseFredCsvToMonthMap(csvText);
      if (map.size === 0) {
        throw new Error("empty-series");
      }
      assets.push({
        id: target.id,
        name: target.name,
        legendName: target.legendName,
        categoryKey: "metals",
        categoryLabel: "贵金属",
        subgroupLabel: "贵金属",
        source: `FRED（${target.seriesId}）`,
        unit: "美元",
      });
      seriesById.set(target.id, map);
    } catch (error) {
      warnings.push(`${target.legendName} 加载失败。`);
    }
  });

  const cryptoTasks = CRYPTO_SERIES.map(async (target) => {
    try {
      const jsonText = await fetchTextResilient(target.url);
      const map = parseBinanceKlinesToMonthMap(jsonText);
      if (map.size === 0) {
        throw new Error("empty-series");
      }
      assets.push({
        id: target.id,
        name: target.name,
        legendName: target.legendName,
        categoryKey: "crypto",
        categoryLabel: "加密资产",
        subgroupLabel: "加密资产",
        source: "Binance",
        unit: "美元",
      });
      seriesById.set(target.id, map);
    } catch (error) {
      warnings.push(`${target.legendName} 加载失败。`);
    }
  });

  await Promise.all([...caseShillerTasks, ...metalTasks, ...cryptoTasks]);

  if (assets.length === 0) {
    throw new Error("all-source-load-failed");
  }

  let endMonth = BASE_START_MONTH;
  seriesById.forEach((map) => {
    for (const month of map.keys()) {
      if (month > endMonth) endMonth = month;
    }
  });
  const nowMonth = currentMonthUtc();
  if (endMonth > nowMonth) endMonth = nowMonth;

  const dates = enumerateMonths(BASE_START_MONTH, endMonth);
  const values = {};

  assets.forEach((asset) => {
    const sourceMap = seriesById.get(asset.id) || new Map();
    const series = dates.map((month) => {
      const value = Number(sourceMap.get(month));
      return isFiniteNumber(value) ? Number(value.toFixed(6)) : null;
    });
    asset.availableRange = buildAvailableRange(series, dates);
    values[asset.id] = series;
  });

  const categories = [
    { key: "cn_housing", label: "中国房产" },
    { key: "us_housing", label: "美国房产" },
    { key: "metals", label: "贵金属" },
    { key: "crypto", label: "加密资产" },
  ];

  return {
    generatedAt: new Date().toISOString(),
    baseMonth: BASE_START_MONTH,
    dates,
    assets,
    values,
    categories,
    warnings,
  };
}

function sortAssetsForUi(assetList) {
  const subgroupOrderIndex = new Map(SUBGROUP_ORDER.map((name, index) => [name, index]));
  return [...assetList].sort((a, b) => {
    const aGroup = subgroupOrderIndex.has(a.subgroupLabel)
      ? subgroupOrderIndex.get(a.subgroupLabel)
      : Number.MAX_SAFE_INTEGER;
    const bGroup = subgroupOrderIndex.has(b.subgroupLabel)
      ? subgroupOrderIndex.get(b.subgroupLabel)
      : Number.MAX_SAFE_INTEGER;
    if (aGroup !== bGroup) return aGroup - bGroup;
    return String(a.name).localeCompare(String(b.name), "zh-CN");
  });
}

function buildAssetControls(assetList) {
  assetById.clear();
  sortAssetsForUi(assetList).forEach((asset) => {
    assetById.set(asset.id, asset);
  });

  const defaultSelected = pickDefaultAssets(assetList);
  const grouped = new Map();

  sortAssetsForUi(assetList).forEach((asset) => {
    if (!grouped.has(asset.subgroupLabel)) {
      grouped.set(asset.subgroupLabel, []);
    }
    grouped.get(asset.subgroupLabel).push(asset);
  });

  const html = [];
  grouped.forEach((items, subgroupLabel) => {
    html.push(`<section class="asset-group" data-group="${subgroupLabel}">`);
    html.push(`<h4 class="asset-group-title">${subgroupLabel}</h4>`);
    html.push('<div class="asset-grid">');
    items.forEach((asset) => {
      const checked = defaultSelected.has(asset.id) ? "checked" : "";
      html.push(
        `<label class="asset-item" data-name="${asset.name} ${asset.legendName}">` +
          `<input type="checkbox" value="${asset.id}" ${checked} />` +
          `<span>${asset.legendName}</span>` +
        "</label>",
      );
    });
    html.push("</div>");
    html.push("</section>");
  });

  assetListEl.innerHTML = html.join("");
}

function readSelectedAssetIds() {
  return [...assetListEl.querySelectorAll('input[type="checkbox"]:checked')]
    .map((input) => input.value)
    .filter((id) => assetById.has(id));
}

function enforceAssetSelectionLimit(changedInput = null) {
  const checkedInputs = [...assetListEl.querySelectorAll('input[type="checkbox"]:checked')];
  if (checkedInputs.length <= MAX_SELECTED_ASSET_COUNT) {
    return true;
  }

  if (changedInput && changedInput.checked) {
    changedInput.checked = false;
  } else {
    checkedInputs.slice(MAX_SELECTED_ASSET_COUNT).forEach((input) => {
      input.checked = false;
    });
  }
  return false;
}

function applyAssetSearchFilter() {
  const keyword = String(assetSearchEl.value || "").trim().toLowerCase();
  const labels = [...assetListEl.querySelectorAll(".asset-item")];
  labels.forEach((label) => {
    const text = String(label.dataset.name || "").toLowerCase();
    const show = !keyword || text.includes(keyword);
    label.classList.toggle("asset-item-hidden", !show);
  });

  [...assetListEl.querySelectorAll(".asset-group")].forEach((group) => {
    const visibleCount = group.querySelectorAll(".asset-item:not(.asset-item-hidden)").length;
    group.classList.toggle("asset-group-hidden", visibleCount === 0);
  });
}

function buildMonthSelects(dates) {
  const options = dates.map((month) => `<option value="${month}">${formatMonthZh(month)}</option>`).join("");
  startMonthEl.innerHTML = options;
  endMonthEl.innerHTML = options;

  const defaultStart = dates.includes(BASE_START_MONTH) ? BASE_START_MONTH : dates[0];
  startMonthEl.value = defaultStart;
  endMonthEl.value = dates[dates.length - 1];
}

function renderSummaryTable(rows) {
  summaryBodyEl.innerHTML = "";
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = [
      row.name,
      formatNumber(row.baseRaw, 2),
      formatNumber(row.peakValue, 1),
      formatNumber(row.latestValue, 1),
      formatPercent(row.rangePct, 1),
      formatPercent(row.drawdownFromPeakPct, 1),
      row.latestDate ? formatMonthZh(row.latestDate) : "-",
    ]
      .map((cell) => `<td>${cell}</td>`)
      .join("");
    summaryBodyEl.appendChild(tr);
  });
}

function getSeriesColor(index) {
  const palette = SERIES_COLORS[getCurrentThemeMode()] || SERIES_COLORS[THEME_MODE_LIGHT];
  return palette[index % palette.length];
}

function makeOption(rendered, months, viewportStartMonth, viewportEndMonth) {
  const chartTheme = getActiveChartThemeStyle();
  const axisLabelStep = Math.max(1, Math.ceil(months.length / (window.innerWidth <= 760 ? 8 : 12)));

  const startIndex = Math.max(0, months.findIndex((m) => normalizeMonthToken(m) === normalizeMonthToken(viewportStartMonth)));
  const endIndex = months.findIndex((m) => normalizeMonthToken(m) === normalizeMonthToken(viewportEndMonth));
  const safeEndIndex = endIndex >= 0 ? endIndex : months.length - 1;

  const zoomStart = months.length > 1 ? (startIndex / (months.length - 1)) * 100 : 0;
  const zoomEnd = months.length > 1 ? (safeEndIndex / (months.length - 1)) * 100 : 100;

  return {
    backgroundColor: chartTheme.chartBackground,
    color: rendered.map((item) => item.color),
    animationDuration: 620,
    textStyle: {
      fontFamily: CHART_FONT_FAMILY,
      color: chartTheme.chartTextColor,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        snap: true,
        lineStyle: {
          color: chartTheme.tooltipAxisPointerColor,
          width: 1.15,
          type: "dashed",
        },
      },
      backgroundColor: chartTheme.tooltipBackground,
      borderColor: chartTheme.tooltipBorderColor,
      borderWidth: 1,
      padding: [9, 12],
      extraCssText: chartTheme.tooltipExtraCssText,
      textStyle: {
        fontFamily: CHART_FONT_FAMILY,
        color: chartTheme.tooltipTextColor,
      },
      formatter(params) {
        const rows = Array.isArray(params) ? params : [params];
        if (!rows.length) return "";
        const axisRaw = rows[0]?.axisValue ?? rows[0]?.axisValueLabel ?? "";
        const headText = formatMonthDot(axisRaw);
        const detail = rows
          .map((item) => {
            const value = Array.isArray(item?.value)
              ? item.value[item.value.length - 1]
              : item?.value;
            const valueText = isFiniteNumber(value) ? value.toFixed(1) : "-";
            return `${item?.marker || ""} ${item?.seriesName || "-"}&nbsp;&nbsp;${valueText}`;
          })
          .join("<br/>");
        return `${headText}<br/>${detail}`;
      },
    },
    legend: {
      bottom: 52,
      itemWidth: 20,
      itemHeight: 4,
      textStyle: {
        color: chartTheme.legendTextColor,
        fontSize: window.innerWidth <= 760 ? 12 : 13,
        fontWeight: 700,
        fontFamily: CHART_FONT_FAMILY,
      },
    },
    toolbox: {
      right: 8,
      top: 6,
      feature: {
        myExportImage: {
          show: true,
          title: "导出图片（标准）",
          icon: "path://M128 704h768v64H128zM480 128h64v352h112L512 640 368 480h112z",
          onclick: () => exportCurrentChartImage(2, "标准清晰"),
        },
        myExportImageUltra: {
          show: true,
          title: "导出图片（超清）",
          icon: "path://M128 704h768v64H128zM480 128h64v352h112L512 640 368 480h112z",
          onclick: () => exportCurrentChartImage(4, "超清"),
        },
      },
    },
    grid: {
      left: 70,
      right: 78,
      top: 44,
      bottom: 112,
    },
    xAxis: {
      type: "category",
      data: months,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: chartTheme.xAxisLineColor,
          width: 1.15,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: chartTheme.xAxisLabelColor,
        fontSize: window.innerWidth <= 760 ? 10.5 : 12,
        margin: 10,
        formatter(value, index) {
          if (index % axisLabelStep !== 0 && index !== months.length - 1) return "";
          return formatMonthDot(value);
        },
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      scale: true,
      axisLine: {
        lineStyle: {
          color: chartTheme.yAxisLineColor,
          width: 1.15,
        },
      },
      axisTick: { show: false },
      axisLabel: {
        color: chartTheme.yAxisLabelColor,
        fontSize: window.innerWidth <= 760 ? 10.5 : 12,
        formatter(value) {
          return isFiniteNumber(value) ? Number(value).toFixed(0) : "";
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(124, 151, 172, 0.24)",
        },
      },
    },
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        filterMode: "none",
        start: zoomStart,
        end: zoomEnd,
        showDetail: false,
        brushSelect: false,
        bottom: 26,
        height: 28,
        borderColor: "rgba(0, 0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        fillerColor: "rgba(0, 0, 0, 0)",
        dataBackground: {
          lineStyle: {
            color: "rgba(0, 0, 0, 0)",
            width: 0,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
        selectedDataBackground: {
          lineStyle: {
            color: "rgba(0, 0, 0, 0)",
            width: 0,
          },
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
        moveHandleStyle: {
          color: "rgba(0, 0, 0, 0)",
        },
        handleSize: "110%",
        handleStyle: {
          color: chartTheme.sliderHandleColor,
          borderColor: chartTheme.sliderHandleBorderColor,
          borderWidth: 1.2,
        },
        emphasis: {
          moveHandleStyle: {
            color: "rgba(0, 0, 0, 0)",
          },
          handleStyle: {
            color: chartTheme.sliderHandleHoverColor,
            borderColor: chartTheme.sliderHandleHoverBorderColor,
            borderWidth: 1.4,
          },
        },
        textStyle: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
    ],
    series: rendered.map((item) => ({
      id: item.id,
      name: item.name,
      type: "line",
      smooth: false,
      showSymbol: false,
      connectNulls: false,
      lineStyle: {
        width: 2.2,
        color: item.color,
      },
      emphasis: {
        focus: "series",
      },
      data: item.normalized,
    })),
  };
}

function render() {
  latestRenderContext = null;
  const selectedAssetIds = readSelectedAssetIds();
  const requestedStartMonth = startMonthEl.value;
  const requestedEndMonth = endMonthEl.value;

  if (selectedAssetIds.length === 0) {
    chart.clear();
    summaryBodyEl.innerHTML = "";
    footnoteEl.textContent = "";
    setStatus("请至少选择一个资产。", true);
    return;
  }

  if (selectedAssetIds.length > MAX_SELECTED_ASSET_COUNT) {
    setStatus(`一次最多选择 ${MAX_SELECTED_ASSET_COUNT} 个资产，请减少勾选后再生成。`, true);
    return;
  }

  if (!requestedStartMonth || !requestedEndMonth || requestedStartMonth > requestedEndMonth) {
    chart.clear();
    summaryBodyEl.innerHTML = "";
    footnoteEl.textContent = "";
    setStatus("时间区间无效，请确保起点不晚于终点。", true);
    return;
  }

  const startIndex = raw.dates.indexOf(requestedStartMonth);
  const endIndex = raw.dates.indexOf(requestedEndMonth);
  if (startIndex < 0 || endIndex < 0 || startIndex > endIndex) {
    setStatus("时间索引错误，请重新选择区间。", true);
    return;
  }

  const months = raw.dates.slice(startIndex, endIndex + 1);
  const monthTokens = months.map((month) => normalizeMonthToken(month));

  const findMonthIndexByToken = (monthValue) => {
    const token = normalizeMonthToken(monthValue);
    if (!token) return -1;
    return monthTokens.findIndex((item) => item === token);
  };

  let viewportStartOffset = 0;
  let viewportEndOffset = months.length - 1;
  if (typeof uiState.zoomStartMonth === "string") {
    const idx = findMonthIndexByToken(uiState.zoomStartMonth);
    if (idx >= 0) viewportStartOffset = idx;
  }
  if (typeof uiState.zoomEndMonth === "string") {
    const idx = findMonthIndexByToken(uiState.zoomEndMonth);
    if (idx >= 0) viewportEndOffset = idx;
  }
  if (viewportStartOffset > viewportEndOffset) {
    viewportStartOffset = 0;
    viewportEndOffset = months.length - 1;
  }

  const viewportMonths = months.slice(viewportStartOffset, viewportEndOffset + 1);
  const viewportStartMonth = viewportMonths[0] || months[0];
  const viewportEndMonth = viewportMonths[viewportMonths.length - 1] || months[months.length - 1];
  uiState.zoomStartMonth = normalizeMonthToken(viewportStartMonth) || viewportStartMonth;
  uiState.zoomEndMonth = normalizeMonthToken(viewportEndMonth) || viewportEndMonth;

  const rendered = [];
  const summaryRows = [];
  const missingBase = [];

  selectedAssetIds.forEach((assetId, index) => {
    const asset = assetById.get(assetId);
    const fullSeries = raw.values?.[assetId];
    if (!asset || !Array.isArray(fullSeries)) return;

    const seriesRaw = fullSeries.slice(startIndex, endIndex + 1);
    const baseRaw = seriesRaw[viewportStartOffset];
    if (!isFiniteNumber(baseRaw) || baseRaw <= 0) {
      missingBase.push(asset.legendName || asset.name);
      return;
    }

    const normalized = seriesRaw.map((value) => {
      if (!isFiniteNumber(value)) return null;
      return (value / baseRaw) * 100;
    });

    const viewportSeries = normalized.slice(viewportStartOffset, viewportEndOffset + 1);
    const validValues = viewportSeries.filter(isFiniteNumber);
    const peakValue = validValues.length ? Math.max(...validValues) : null;
    const latestInfo = getLastFiniteInfo(viewportSeries, viewportMonths);
    const rangePct =
      isFiniteNumber(latestInfo.value) ? calcPctChange(latestInfo.value, 100) : null;
    const drawdownFromPeakPct =
      isFiniteNumber(latestInfo.value) && isFiniteNumber(peakValue)
        ? ((latestInfo.value / peakValue) - 1) * 100
        : null;

    const displayName = asset.legendName || asset.name;
    rendered.push({
      id: asset.id,
      name: displayName,
      normalized,
      color: getSeriesColor(index),
    });

    summaryRows.push({
      name: displayName,
      baseRaw,
      peakValue,
      latestValue: latestInfo.value,
      latestDate: latestInfo.date,
      rangePct,
      drawdownFromPeakPct,
    });
  });

  if (rendered.length === 0) {
    chart.clear();
    summaryBodyEl.innerHTML = "";
    footnoteEl.textContent = "";
    setStatus("所选资产在当前滑块起点无可用值，请调整时间区间或资产组合。", true);
    return;
  }

  const renderedNameSet = new Set(rendered.map((item) => item.name));
  uiState.hiddenAssetNames = new Set(
    [...uiState.hiddenAssetNames].filter((name) => renderedNameSet.has(name)),
  );

  const visibleRows = summaryRows.filter((row) => !uiState.hiddenAssetNames.has(row.name));
  latestRenderContext = {
    startMonth: viewportStartMonth,
    endMonth: viewportEndMonth,
  };

  isApplyingOption = true;
  chart.setOption(makeOption(rendered, months, viewportStartMonth, viewportEndMonth), {
    notMerge: true,
    lazyUpdate: false,
  });
  isApplyingOption = false;

  rendered.forEach((item, idx) => {
    if (uiState.hiddenAssetNames.has(item.name)) {
      chart.dispatchAction({ type: "legendUnSelect", name: item.name, seriesIndex: idx });
    }
  });

  chartTitleEl.textContent = "多资产价格走势对比";
  chartMetaEl.textContent = `${formatMonthZh(viewportStartMonth)} - ${formatMonthZh(viewportEndMonth)} | 定基 ${formatMonthZh(viewportStartMonth)} = 100`;

  renderSummaryTable(visibleRows);

  const activeSources = new Set();
  selectedAssetIds.forEach((id) => {
    const asset = assetById.get(id);
    if (asset?.source) activeSources.add(asset.source);
  });
  const sourceText = [...activeSources].slice(0, 4).join(" / ");
  footnoteEl.textContent = `当前滑块区间：${viewportStartMonth} ~ ${viewportEndMonth}；数据源：${sourceText || "-"}。`;

  const missingText = missingBase.length ? `未纳入：${missingBase.join("、")}。` : "";
  setStatus(`已生成 ${rendered.length} 条走势（定基 ${viewportStartMonth}=100）。${missingText}`, false);
}

function bindEvents() {
  themeModeEl.addEventListener("change", () => {
    applyThemeMode(themeModeEl.value, { persist: true, rerender: true });
  });

  renderBtn.addEventListener("click", () => {
    uiState.hiddenAssetNames.clear();
    render();
  });

  assetListEl.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;
    const passed = enforceAssetSelectionLimit(target);
    if (!passed) {
      setStatus(`一次最多选择 ${MAX_SELECTED_ASSET_COUNT} 个资产。`, true);
    }
  });

  selectAllBtn.addEventListener("click", () => {
    let selectedCount = 0;
    [...assetListEl.querySelectorAll('.asset-item:not(.asset-item-hidden) input[type="checkbox"]')].forEach((input) => {
      if (selectedCount < MAX_SELECTED_ASSET_COUNT) {
        input.checked = true;
        selectedCount += 1;
      } else {
        input.checked = false;
      }
    });
    setStatus(`已选择前 ${MAX_SELECTED_ASSET_COUNT} 个可见资产。`, false);
  });

  clearAllBtn.addEventListener("click", () => {
    assetListEl.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
  });

  assetSearchEl.addEventListener("input", () => {
    applyAssetSearchFilter();
  });

  startMonthEl.addEventListener("change", () => {
    if (startMonthEl.value > endMonthEl.value) {
      endMonthEl.value = startMonthEl.value;
    }
  });

  endMonthEl.addEventListener("change", () => {
    if (endMonthEl.value < startMonthEl.value) {
      startMonthEl.value = endMonthEl.value;
    }
  });

  chart.on("legendselectchanged", (params) => {
    if (isApplyingOption) return;
    const hidden = new Set();
    Object.entries(params.selected || {}).forEach(([name, selected]) => {
      if (!selected) hidden.add(name);
    });
    uiState.hiddenAssetNames = hidden;
    render();
  });

  chart.on("dataZoom", (event) => {
    if (isApplyingOption || isSyncingRangeFromSlider) return;
    pendingZoomPayload = getZoomPayload(event);

    if (dataZoomSyncTimer) {
      clearTimeout(dataZoomSyncTimer);
      dataZoomSyncTimer = null;
    }

    dataZoomSyncTimer = setTimeout(() => {
      const option = chart.getOption();
      const axisData = option?.xAxis?.[0]?.data;
      const zoomList = option?.dataZoom;
      if (!Array.isArray(axisData) || axisData.length === 0 || !Array.isArray(zoomList)) return;

      const sliderZoom =
        zoomList.find((item) => item?.type === "slider") ||
        zoomList.find((item) => Number(item?.xAxisIndex) === 0) ||
        zoomList[0];
      if (!sliderZoom) return;

      const zoomPayload = pendingZoomPayload || sliderZoom;
      pendingZoomPayload = null;
      const startPercent = toFiniteNumber(zoomPayload?.start) ?? toFiniteNumber(sliderZoom.start);
      const endPercent = toFiniteNumber(zoomPayload?.end) ?? toFiniteNumber(sliderZoom.end);

      const nextStartMonth = resolveAxisMonthFromPercent(startPercent, axisData) || uiState.zoomStartMonth;
      const nextEndMonth = resolveAxisMonthFromPercent(endPercent, axisData) || uiState.zoomEndMonth;
      const normalizedStartMonth = normalizeMonthToken(nextStartMonth);
      const normalizedEndMonth = normalizeMonthToken(nextEndMonth);

      if (!normalizedStartMonth || !normalizedEndMonth || normalizedStartMonth > normalizedEndMonth) {
        return;
      }
      if (
        uiState.zoomStartMonth === normalizedStartMonth &&
        uiState.zoomEndMonth === normalizedEndMonth
      ) {
        return;
      }

      uiState.zoomStartMonth = normalizedStartMonth;
      uiState.zoomEndMonth = normalizedEndMonth;

      isSyncingRangeFromSlider = true;
      try {
        render();
      } finally {
        isSyncingRangeFromSlider = false;
      }
    }, 90);
  });

  window.addEventListener("resize", () => {
    chart.resize();
    render();
  });
}

async function init() {
  applyThemeMode(readStoredThemeMode(), { persist: false, rerender: false });

  setStatus("正在加载多资产数据（中国房产/Case-Shiller/贵金属/加密资产）...", false);
  let dataset;
  try {
    dataset = await buildMultiAssetDataset();
  } catch (error) {
    setStatus("多资产数据加载失败，请检查网络后刷新重试。", true);
    return;
  }

  raw = dataset;
  buildAssetControls(raw.assets);
  buildMonthSelects(raw.dates);
  applyAssetSearchFilter();
  bindEvents();
  render();

  if (Array.isArray(dataset.warnings) && dataset.warnings.length > 0) {
    setStatus(`已加载核心数据，部分资产源暂不可用：${dataset.warnings.slice(0, 3).join(" ")}`, true);
  }
}

init();
