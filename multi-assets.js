const THEME_MODE_STORAGE_KEY = "house-price-theme-mode";
const THEME_MODE_LIGHT = "light";
const THEME_MODE_DARK = "dark";
const MAX_SELECTED_ASSET_COUNT = 6;
const BASE_START_MONTH = "2008-01";
const CHART_FONT_FAMILY = '"STKaiti", "Kaiti SC", "KaiTi", "BiauKai", serif';

const CASE_SHILLER_SERIES = Object.freeze([
  { id: "us_cs_atxrsa", seriesId: "ATXRSA", name: "美国房产·亚特兰大都会区", legendName: "亚特兰大（Case-Shiller）" },
  { id: "us_cs_boxrsa", seriesId: "BOXRSA", name: "美国房产·波士顿都会区", legendName: "波士顿（Case-Shiller）" },
  { id: "us_cs_crxrsa", seriesId: "CRXRSA", name: "美国房产·夏洛特都会区", legendName: "夏洛特（Case-Shiller）" },
  { id: "us_cs_chxrsa", seriesId: "CHXRSA", name: "美国房产·芝加哥都会区", legendName: "芝加哥（Case-Shiller）" },
  { id: "us_cs_cexrsa", seriesId: "CEXRSA", name: "美国房产·克利夫兰都会区", legendName: "克利夫兰（Case-Shiller）" },
  { id: "us_cs_daxrsa", seriesId: "DAXRSA", name: "美国房产·达拉斯都会区", legendName: "达拉斯（Case-Shiller）" },
  { id: "us_cs_dnxrsa", seriesId: "DNXRSA", name: "美国房产·丹佛都会区", legendName: "丹佛（Case-Shiller）" },
  { id: "us_cs_dexrsa", seriesId: "DEXRSA", name: "美国房产·底特律都会区", legendName: "底特律（Case-Shiller）" },
  { id: "us_cs_lvxrsa", seriesId: "LVXRSA", name: "美国房产·拉斯维加斯都会区", legendName: "拉斯维加斯（Case-Shiller）" },
  { id: "us_cs_lxxrsa", seriesId: "LXXRSA", name: "美国房产·洛杉矶都会区", legendName: "洛杉矶（Case-Shiller）" },
  { id: "us_cs_mixrsa", seriesId: "MIXRSA", name: "美国房产·迈阿密都会区", legendName: "迈阿密（Case-Shiller）" },
  { id: "us_cs_mnxrsa", seriesId: "MNXRSA", name: "美国房产·明尼阿波利斯都会区", legendName: "明尼阿波利斯（Case-Shiller）" },
  { id: "us_cs_nyxrsa", seriesId: "NYXRSA", name: "美国房产·纽约都会区", legendName: "纽约（Case-Shiller）" },
  { id: "us_cs_phxrsa", seriesId: "PHXRSA", name: "美国房产·菲尼克斯都会区", legendName: "菲尼克斯（Case-Shiller）" },
  { id: "us_cs_poxrsa", seriesId: "POXRSA", name: "美国房产·波特兰都会区", legendName: "波特兰（Case-Shiller）" },
  { id: "us_cs_sdxrsa", seriesId: "SDXRSA", name: "美国房产·圣地亚哥都会区", legendName: "圣地亚哥（Case-Shiller）" },
  { id: "us_cs_sfxrsa", seriesId: "SFXRSA", name: "美国房产·旧金山都会区", legendName: "旧金山（Case-Shiller）" },
  { id: "us_cs_sexrsa", seriesId: "SEXRSA", name: "美国房产·西雅图都会区", legendName: "西雅图（Case-Shiller）" },
  { id: "us_cs_tpxrsa", seriesId: "TPXRSA", name: "美国房产·坦帕都会区", legendName: "坦帕（Case-Shiller）" },
  { id: "us_cs_wdxrsa", seriesId: "WDXRSA", name: "美国房产·华盛顿都会区", legendName: "华盛顿（Case-Shiller）" },
]);

const METAL_SERIES = Object.freeze([
  { id: "metal_gold_spot_usd", seriesId: "GOLDAMGBD228NLBM", name: "贵金属·黄金现货（USD）", legendName: "黄金（USD）" },
  { id: "metal_silver_spot_usd", seriesId: "SLVPRUSD", name: "贵金属·白银现货（USD）", legendName: "白银（USD）" },
]);

const EQUITY_SERIES = Object.freeze([
  {
    id: "equity_sp500",
    name: "权益类资产·标普500",
    legendName: "标普500",
    parser: "stooq",
    url: "https://stooq.com/q/d/l/?s=%5Espx&i=d",
    source: "Stooq（^SPX）",
  },
  {
    id: "equity_nasdaq100",
    name: "权益类资产·纳斯达克100",
    legendName: "纳斯达克100",
    parser: "stooq",
    url: "https://stooq.com/q/d/l/?s=%5Endx&i=d",
    source: "Stooq（^NDX）",
  },
  {
    id: "equity_csi300",
    name: "权益类资产·沪深300",
    legendName: "沪深300",
    parser: "eastmoney",
    url:
      "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=1.000300&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58&klt=101&fqt=0&beg=20080101&end=20500101",
    source: "东方财富（沪深300）",
  },
]);

const CATEGORY_MODULES = Object.freeze([
  {
    key: "cn_housing",
    title: "中国房产",
    description: "",
  },
  {
    key: "us_housing",
    title: "美国房产",
    description: "Case-Shiller 月度城市指数",
  },
  {
    key: "metals",
    title: "贵金属",
    description: "黄金、白银现货价格",
  },
  {
    key: "equities",
    title: "权益类资产",
    description: "标普500、纳斯达克100、沪深300",
  },
]);

const CHINA_SOURCE_MODE_CONFIG = Object.freeze([
  { key: "centaline", label: "中原" },
  { key: "nbs70", label: "统计局" },
]);
const CHART_LAYOUT_BASE_WIDTH = 1160;
const CHART_LAYOUT_ASPECT_RATIO = 0.78;
const CHART_LAYOUT_MIN_HEIGHT = 420;
const CHART_LAYOUT_MAX_HEIGHT = 1080;
const CHART_HEIGHT_SCALE = 1.1;
const CHART_AXIS_WIDTH_SCALE = 1.06;
const OVERLAY_LEFT_RATIO = 0.12;
const OVERLAY_TOP_RATIO = 0.05;
const OVERLAY_SCALE_MIN = 0.72;
const OVERLAY_SCALE_MAX = 1.3;
const CHART_GRID_LAYOUT = Object.freeze({
  left: 70,
  right: 90,
  top: 44,
  bottom: 112,
});
const OVERLAY_CITY_ORDER = ["北京", "上海", "广州", "深圳", "天津", "香港", "纽约", "洛杉矶"];
const OVERLAY_CITY_ORDER_INDEX = new Map(
  OVERLAY_CITY_ORDER.map((name, index) => [name, index]),
);

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
    textMaskColor: "rgba(245, 252, 255, 0.62)",
    overlayTitleColor: "#1f3e53",
    overlayLineColor: "#607786",
    overlayTextColor: "#1f394b",
    overlaySubTextColor: "#436277",
    tooltipBackground: "rgba(248, 253, 255, 0.98)",
    tooltipBorderColor: "rgba(150, 181, 203, 0.96)",
    tooltipTextColor: "#23506c",
    tooltipAxisPointerColor: "rgba(95, 129, 153, 0.9)",
    candleUpColor: "#2f9c72",
    candleUpBorderColor: "#25825e",
    candleDownColor: "#e15050",
    candleDownBorderColor: "#cf3a3a",
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
    textMaskColor: "rgba(6, 12, 18, 0.66)",
    overlayTitleColor: "#e1ebf2",
    overlayLineColor: "#95aab8",
    overlayTextColor: "#d7e3eb",
    overlaySubTextColor: "#acc0cc",
    tooltipBackground: "rgba(9, 17, 24, 0.97)",
    tooltipBorderColor: "rgba(245, 164, 59, 0.62)",
    tooltipTextColor: "#dde9f2",
    tooltipAxisPointerColor: "rgba(245, 164, 59, 0.86)",
    candleUpColor: "#4fcb95",
    candleUpBorderColor: "#73ddaf",
    candleDownColor: "#ff6c6c",
    candleDownBorderColor: "#ff8a8a",
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

const METAL_FIXED_COLORS = Object.freeze({
  [THEME_MODE_LIGHT]: Object.freeze({
    metal_gold_spot_usd: "#d6a62a",
    metal_silver_spot_usd: "#7f90a3",
  }),
  [THEME_MODE_DARK]: Object.freeze({
    metal_gold_spot_usd: "#f4c34d",
    metal_silver_spot_usd: "#c4d0db",
  }),
});

const themeModeEl = document.getElementById("themeMode");
const assetListEl = document.getElementById("assetList");
const assetSearchEl = document.getElementById("assetSearch");
const startMonthEl = document.getElementById("startMonth");
const endMonthEl = document.getElementById("endMonth");
const renderBtn = document.getElementById("renderBtn");
const selectAllBtn = document.getElementById("selectAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const chartTableBtn = document.getElementById("chartTableBtn");
const statusEl = document.getElementById("statusText");
const summaryBodyEl = document.getElementById("summaryBody");
const chartTitleEl = document.getElementById("chartTitle");
const chartMetaEl = document.getElementById("chartMeta");
const footnoteEl = document.getElementById("footnoteText");
const chartEl = document.getElementById("chart");
const chartStatsOverlayEl = document.getElementById("chartStatsOverlay");
const chartStageEl = chartEl ? chartEl.closest(".chart-stage") : null;
const timeZoomWidgetEl = document.getElementById("timeZoomWidget");
const timeZoomRangeTextEl = document.getElementById("timeZoomRangeText");
const timeZoomFillEl = document.getElementById("timeZoomFill");
const timeZoomStartEl = document.getElementById("timeZoomStart");
const timeZoomEndEl = document.getElementById("timeZoomEnd");

const chart = echarts.init(chartEl, null, {
  renderer: "canvas",
});

const assetById = new Map();
let raw = null;
let latestRenderContext = null;
let isApplyingOption = false;
let isSyncingRangeFromSlider = false;
let timeZoomMonths = [];
let timeZoomRenderFrame = null;
let isSyncingTimeZoomInputs = false;
let textMeasureContext = null;

const uiState = {
  hiddenAssetNames: new Set(),
  zoomStartMonth: null,
  zoomEndMonth: null,
  chinaSourceMode: "centaline",
  showChartTable: true,
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

function normalizeDateToken(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const matched = text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (!matched) return "";
  return `${matched[1]}-${String(Number(matched[2])).padStart(2, "0")}-${String(
    Number(matched[3]),
  ).padStart(2, "0")}`;
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

function formatOverlayRangeLabel(startMonth, endMonth) {
  return `${formatMonthZh(startMonth)}－${formatMonthZh(endMonth)}`;
}

function formatOverlayBaseLabel(baseMonth) {
  return `定基${formatMonthZh(baseMonth)}＝100`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    if (char === ">") return "&gt;";
    if (char === '"') return "&quot;";
    return "&#39;";
  });
}

function getOverlayMonthTextSegments(month) {
  const normalized = normalizeMonthToken(month);
  const matched = normalized.match(/^(\d{4})-(\d{2})$/);
  if (!matched) {
    return [
      {
        text: formatMonthZh(month),
        isDigit: false,
      },
    ];
  }
  const monthNumber = String(Number(matched[2]));
  return [
    { text: matched[1], isDigit: true },
    { text: "年", isDigit: false },
    { text: monthNumber, isDigit: true },
    { text: "月", isDigit: false },
  ];
}

function renderOverlayTextSegmentsHtml(segments) {
  return segments
    .map((segment) => {
      const text = escapeHtml(segment.text);
      if (!segment.isDigit) return text;
      return `<span class="chart-stats-digit">${text}</span>`;
    })
    .join("");
}

function buildOverlayRangeHtml(startMonth, endMonth) {
  const startHtml = renderOverlayTextSegmentsHtml(getOverlayMonthTextSegments(startMonth));
  const endHtml = renderOverlayTextSegmentsHtml(getOverlayMonthTextSegments(endMonth));
  return `${startHtml}<span class="chart-stats-range-sep">－</span>${endHtml}`;
}

function buildOverlayBaseValueHtml(baseMonth) {
  const monthHtml = renderOverlayTextSegmentsHtml(getOverlayMonthTextSegments(baseMonth));
  return `${monthHtml}<span class="chart-stats-base-eq">＝</span><span class="chart-stats-digit">100</span>`;
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

function calcMaxDrawdownPct(series) {
  if (!Array.isArray(series) || series.length === 0) return null;
  let runningPeak = null;
  let maxDrawdownPct = 0;

  series.forEach((value) => {
    if (!isFiniteNumber(value)) return;
    if (!isFiniteNumber(runningPeak) || value > runningPeak) {
      runningPeak = value;
      return;
    }
    if (!runningPeak || runningPeak <= 0) return;
    const drawdownPct = ((value / runningPeak) - 1) * 100;
    if (drawdownPct < maxDrawdownPct) {
      maxDrawdownPct = drawdownPct;
    }
  });

  if (!isFiniteNumber(runningPeak)) return null;
  return maxDrawdownPct;
}

function normalizeSourceProviderLabel(sourceLabel) {
  const text = String(sourceLabel || "").trim();
  if (!text) return "";
  if (/Case-Shiller/i.test(text)) return "S&P Case-Shiller";
  if (/国家统计局|统计局/.test(text)) return "国家统计局";
  if (/中原/.test(text)) return "中原研究中心";
  if (/Stooq/i.test(text)) return "Stooq";
  if (/东方财富/.test(text)) return "东方财富";
  if (/FRED/i.test(text)) return "FRED";
  return text.replace(/\s*[（(][^（）()]*[）)]\s*/g, "").trim();
}

function summarizeSourceProviders(sourceLabels, { maxItems = 4, fallback = "-" } = {}) {
  const unique = [];
  const used = new Set();
  sourceLabels.forEach((label) => {
    const normalized = normalizeSourceProviderLabel(label);
    if (!normalized || used.has(normalized)) return;
    used.add(normalized);
    unique.push(normalized);
  });
  if (!unique.length) return fallback;
  if (unique.length <= maxItems) return unique.join("、");
  return `${unique.slice(0, maxItems).join("、")} 等${unique.length}项`;
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
    safeRender("主题切换后渲染");
  }
}

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle("error", isError);
}

function safeRender(contextLabel = "渲染") {
  try {
    render();
    return true;
  } catch (error) {
    const message =
      error && typeof error.message === "string" && error.message.trim()
        ? error.message.trim()
        : String(error || "unknown-error");
    setStatus(`${contextLabel}失败：${message}`, true);
    if (typeof console !== "undefined" && console.error) {
      console.error("[multi-assets] render error:", error);
    }
    return false;
  }
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function isTouchPortraitViewport() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse) and (orientation: portrait)").matches;
}

function getResponsiveChartWidth(chartWidth) {
  if (isTouchPortraitViewport()) {
    return Math.min(chartWidth, 760);
  }
  return chartWidth;
}

function resolveChartGridLayout(chartWidth) {
  const responsiveWidth = getResponsiveChartWidth(chartWidth);
  if (responsiveWidth <= 520) {
    return {
      left: 52,
      right: 34,
      top: 36,
      bottom: 92,
    };
  }
  if (responsiveWidth <= 760) {
    return {
      left: 60,
      right: 42,
      top: 40,
      bottom: 100,
    };
  }
  if (responsiveWidth <= 1120) {
    return {
      left: 66,
      right: 62,
      top: 42,
      bottom: 106,
    };
  }
  return CHART_GRID_LAYOUT;
}

function resolveResponsiveChartLayout(chartWidth) {
  const responsiveWidth = getResponsiveChartWidth(chartWidth);
  if (responsiveWidth <= 520) {
    return {
      aspectRatio: 0.88,
      minHeight: 330,
      maxHeight: 560,
      overlayScaleMin: 0.44,
      overlayScaleMax: 0.8,
      overlayLeftRatio: 0.185,
      overlayTopRatio: 0.045,
    };
  }
  if (responsiveWidth <= 760) {
    return {
      aspectRatio: 0.84,
      minHeight: 360,
      maxHeight: 660,
      overlayScaleMin: 0.46,
      overlayScaleMax: 0.9,
      overlayLeftRatio: 0.16,
      overlayTopRatio: 0.046,
    };
  }
  if (responsiveWidth <= 1120) {
    return {
      aspectRatio: 0.74,
      minHeight: 420,
      maxHeight: 920,
      overlayScaleMin: 0.62,
      overlayScaleMax: 1.08,
      overlayLeftRatio: 0.14,
      overlayTopRatio: 0.05,
    };
  }
  return {
    aspectRatio: CHART_LAYOUT_ASPECT_RATIO,
    minHeight: CHART_LAYOUT_MIN_HEIGHT,
    maxHeight: CHART_LAYOUT_MAX_HEIGHT,
    overlayScaleMin: OVERLAY_SCALE_MIN,
    overlayScaleMax: OVERLAY_SCALE_MAX,
    overlayLeftRatio: OVERLAY_LEFT_RATIO,
    overlayTopRatio: OVERLAY_TOP_RATIO,
  };
}

function resolveXAxisLabelLayout(
  months,
  chartWidth,
  visibleStartIndex,
  visibleEndIndex,
  gridLayoutOverride = null,
) {
  const responsiveWidth = getResponsiveChartWidth(chartWidth);
  const gridLayout = gridLayoutOverride || resolveChartGridLayout(chartWidth);
  const safeStart = clampNumber(
    Number.isInteger(visibleStartIndex) ? visibleStartIndex : 0,
    0,
    Math.max(0, months.length - 1),
  );
  const safeEnd = clampNumber(
    Number.isInteger(visibleEndIndex) ? visibleEndIndex : safeStart,
    safeStart,
    Math.max(0, months.length - 1),
  );
  const span = Math.max(0, safeEnd - safeStart);

  let maxLabels = 14;
  let fontSize = 11.8;
  let margin = 14;

  if (responsiveWidth <= 520) {
    maxLabels = 5;
    fontSize = 10.1;
    margin = 12;
  } else if (responsiveWidth <= 760) {
    maxLabels = 7;
    fontSize = 10.8;
    margin = 13;
  } else if (responsiveWidth <= 1120) {
    maxLabels = 10;
  }

  const plotWidth = Math.max(220, chartWidth - gridLayout.left - gridLayout.right);
  const minGapPx =
    responsiveWidth <= 520
      ? 72
      : responsiveWidth <= 760
        ? 86
        : 104;
  const maxByGap = Math.max(2, Math.floor(plotWidth / minGapPx) + 1);
  const targetLabelCount = Math.max(2, Math.min(maxLabels, maxByGap, span + 1));

  const sampledIndexes = new Set();
  if (span === 0) {
    sampledIndexes.add(safeStart);
  } else {
    for (let i = 0; i < targetLabelCount; i += 1) {
      const ratio = targetLabelCount === 1 ? 0 : i / (targetLabelCount - 1);
      const index = Math.round(safeStart + span * ratio);
      sampledIndexes.add(clampNumber(index, safeStart, safeEnd));
    }
    sampledIndexes.add(safeStart);
    sampledIndexes.add(safeEnd);
  }

  let normalizedIndexes = Array.from(sampledIndexes)
    .filter((index) => Number.isInteger(index))
    .sort((a, b) => a - b);

  if (normalizedIndexes.length > 1 && span > 0) {
    const pxPerMonth = plotWidth / span;
    const minGapMonths = Math.max(1, Math.ceil(minGapPx / Math.max(pxPerMonth, 0.0001)));
    const filtered = [];
    for (const index of normalizedIndexes) {
      if (filtered.length === 0) {
        filtered.push(index);
        continue;
      }
      const prev = filtered[filtered.length - 1];
      if (index - prev >= minGapMonths) {
        filtered.push(index);
      }
    }
    if (filtered.length === 1 && safeEnd !== safeStart) {
      filtered.push(safeEnd);
    } else if (filtered.length > 1 && filtered[filtered.length - 1] !== safeEnd) {
      const last = filtered[filtered.length - 1];
      if (safeEnd - last < minGapMonths && filtered.length >= 2) {
        filtered[filtered.length - 1] = safeEnd;
      } else {
        filtered.push(safeEnd);
      }
    }
    normalizedIndexes = Array.from(new Set(filtered)).sort((a, b) => a - b);
  }

  const finalVisibleIndexes = new Set(normalizedIndexes);

  const visibleValues = new Set();
  finalVisibleIndexes.forEach((index) => {
    const value = months[index];
    if (typeof value === "string" && value) {
      visibleValues.add(value);
    }
  });

  return {
    margin,
    rotate: 0,
    fontSize,
    formatLabel(value) {
      const text = normalizeMonthToken(value);
      if (!text) return "";
      return text;
    },
    isLabelVisible(value, index) {
      const normalizedValue = normalizeMonthToken(value);
      if (normalizedValue && visibleValues.has(normalizedValue)) {
        return true;
      }
      if (!normalizedValue && Number.isInteger(index) && finalVisibleIndexes.has(index)) {
        return true;
      }
      return false;
    },
  };
}

function syncChartViewport({ resizeChart = true } = {}) {
  if (!chartEl || !chartStatsOverlayEl) return;
  const chartWidth = chartEl.clientWidth;
  if (!chartWidth) return;
  const responsiveWidth = getResponsiveChartWidth(chartWidth);
  const gridLayout = resolveChartGridLayout(chartWidth);
  const layout = resolveResponsiveChartLayout(chartWidth);

  const chartHeight = Math.round(
    clampNumber(
      chartWidth * layout.aspectRatio * CHART_HEIGHT_SCALE,
      layout.minHeight * CHART_HEIGHT_SCALE,
      layout.maxHeight * CHART_HEIGHT_SCALE,
    ),
  );
  chartEl.style.height = `${chartHeight}px`;

  const overlayScale = clampNumber(
    chartWidth / CHART_LAYOUT_BASE_WIDTH,
    layout.overlayScaleMin,
    layout.overlayScaleMax,
  );
  const preferredLeft = Math.round(chartWidth * layout.overlayLeftRatio);
  const preferredTop = Math.round(chartHeight * layout.overlayTopRatio);
  chartStatsOverlayEl.style.transform = `scale(${overlayScale})`;

  const rawOverlayWidth = Number(chartStatsOverlayEl.offsetWidth) || 0;
  const rawOverlayHeight = Number(chartStatsOverlayEl.offsetHeight) || 0;
  const scaledOverlayWidth = rawOverlayWidth * overlayScale;
  const scaledOverlayHeight = rawOverlayHeight * overlayScale;

  const maxLeft = Math.max(8, chartWidth - scaledOverlayWidth - 8);
  const overlaySafeGap = responsiveWidth <= 520 ? 36 : responsiveWidth <= 760 ? 30 : 18;
  const requestedMinLeft = gridLayout.left + overlaySafeGap;
  const minLeft = Math.min(requestedMinLeft, maxLeft);
  const finalLeft =
    scaledOverlayWidth > 0
      ? Math.round(clampNumber(preferredLeft, minLeft, maxLeft))
      : preferredLeft;

  const minTop = 8;
  const maxTop = Math.max(minTop, chartHeight - scaledOverlayHeight - 8);
  const finalTop =
    scaledOverlayHeight > 0
      ? Math.round(clampNumber(preferredTop, minTop, maxTop))
      : preferredTop;

  chartStatsOverlayEl.style.left = `${finalLeft}px`;
  chartStatsOverlayEl.style.top = `${finalTop}px`;

  if (resizeChart) {
    chart.resize();
  }
}

function updateChartTableButton(eligibleCount) {
  if (!chartTableBtn) return;
  const enabled = eligibleCount > 0;
  if (!enabled) {
    uiState.showChartTable = false;
  }

  chartTableBtn.disabled = !enabled;
  chartTableBtn.classList.toggle("enabled", enabled);

  if (!enabled) {
    chartTableBtn.textContent = "表格汇总（不可用）";
    return;
  }

  chartTableBtn.textContent = uiState.showChartTable
    ? "表格汇总（开启）"
    : "表格汇总（关闭）";
}

function getTextMeasureContext() {
  if (!textMeasureContext) {
    const measureCanvas = document.createElement("canvas");
    textMeasureContext = measureCanvas.getContext("2d");
  }
  return textMeasureContext;
}

function estimateLabelBox(lines, fontSize, padding, fontWeight = 700) {
  const safeLines = Array.isArray(lines) && lines.length > 0 ? lines : [""];
  const safePadding = Array.isArray(padding) && padding.length === 2 ? padding : [2, 4];
  const measureCtx = getTextMeasureContext();
  let maxLineWidth = 0;
  if (measureCtx) {
    measureCtx.font = `${fontWeight} ${fontSize}px ${CHART_FONT_FAMILY}`;
    safeLines.forEach((line) => {
      maxLineWidth = Math.max(maxLineWidth, measureCtx.measureText(String(line)).width);
    });
  } else {
    const fallbackWidth = Math.max(...safeLines.map((line) => String(line).length), 1);
    maxLineWidth = fallbackWidth * fontSize;
  }
  const lineHeight = Math.max(fontSize + 2, Math.round(fontSize * 1.2));
  return {
    width: Math.ceil(maxLineWidth + safePadding[1] * 2),
    height: Math.ceil(lineHeight * safeLines.length + safePadding[0] * 2),
  };
}

function buildLabelRect({
  anchorX,
  anchorY,
  width,
  height,
  position = "top",
  distance = 0,
  offsetX = 0,
  offsetY = 0,
}) {
  let x = anchorX - width / 2 + offsetX;
  let y = anchorY + offsetY;

  if (position === "top") {
    y = y - distance - height;
  } else if (position === "bottom") {
    y = y + distance;
  } else {
    y = y - height / 2;
  }

  return {
    x,
    y,
    width,
    height,
  };
}

function calcRectOverflow(rect, bounds) {
  const overflowLeft = Math.max(0, bounds.left - rect.x);
  const overflowRight = Math.max(0, rect.x + rect.width - bounds.right);
  const overflowTop = Math.max(0, bounds.top - rect.y);
  const overflowBottom = Math.max(0, rect.y + rect.height - bounds.bottom);
  return overflowLeft + overflowRight + overflowTop + overflowBottom;
}

function rectsOverlap(a, b, padding = 2) {
  return !(
    a.x + a.width + padding <= b.x ||
    b.x + b.width + padding <= a.x ||
    a.y + a.height + padding <= b.y ||
    b.y + b.height + padding <= a.y
  );
}

function resolvePeakLabelLayouts(
  rendered,
  months,
  yMin,
  yMax,
  labelGapMonths,
  responsiveChartWidth = chart.getWidth(),
) {
  const layoutMap = new Map();
  if (!Array.isArray(rendered) || rendered.length === 0 || !Array.isArray(months) || months.length === 0) {
    return layoutMap;
  }

  const chartWidth = chart.getWidth();
  const chartHeight = chart.getHeight();
  const gridLayout = resolveChartGridLayout(chartWidth);
  const plotBounds = {
    left: gridLayout.left,
    right: Math.max(gridLayout.left + 1, chartWidth - gridLayout.right),
    top: gridLayout.top,
    bottom: Math.max(gridLayout.top + 1, chartHeight - gridLayout.bottom),
  };
  const peakLabelBounds = {
    left: 8,
    right: Math.max(9, chartWidth - 8),
    top: 8,
    bottom: Math.max(9, chartHeight - 8),
  };
  const plotWidth = Math.max(1, plotBounds.right - plotBounds.left);
  const plotHeight = Math.max(1, plotBounds.bottom - plotBounds.top);
  const ySpan = Math.max(1e-6, yMax - yMin);
  const monthIndexMap = new Map(months.map((month, index) => [month, index]));

  function toPixelCoord(month, value) {
    const monthIndex = monthIndexMap.get(month);
    if (!Number.isInteger(monthIndex) || !isFiniteNumber(value)) return null;
    const xRatio = months.length > 1 ? monthIndex / (months.length - 1) : 0;
    const yRatio = clampNumber((value - yMin) / ySpan, 0, 1);
    return {
      x: plotBounds.left + xRatio * plotWidth,
      y: plotBounds.bottom - yRatio * plotHeight,
    };
  }

  const occupiedRects = [];

  const compactMobile = responsiveChartWidth <= 520;
  const mediumMobile = responsiveChartWidth > 520 && responsiveChartWidth <= 760;
  const topCandidateStyles = compactMobile
    ? [
        { position: "top", distance: 5, fontSize: 9.2, padding: [1, 4] },
        { position: "top", distance: 4, fontSize: 9.2, padding: [1, 4] },
        { position: "top", distance: 6, fontSize: 8.7, padding: [1, 3] },
        { position: "top", distance: 3, fontSize: 8.7, padding: [1, 3] },
        { position: "top", distance: 7, fontSize: 8.2, padding: [1, 3] },
      ]
    : mediumMobile
      ? [
          { position: "top", distance: 6, fontSize: 10.6, padding: [1, 5] },
          { position: "top", distance: 5, fontSize: 10.6, padding: [1, 5] },
          { position: "top", distance: 8, fontSize: 9.9, padding: [1, 4] },
          { position: "top", distance: 4, fontSize: 9.9, padding: [1, 4] },
          { position: "top", distance: 9, fontSize: 9.3, padding: [1, 4] },
        ]
      : [
          { position: "top", distance: 7, fontSize: 12, padding: [2, 6] },
          { position: "top", distance: 5, fontSize: 12, padding: [2, 6] },
          { position: "top", distance: 9, fontSize: 11, padding: [2, 5] },
          { position: "top", distance: 4, fontSize: 11, padding: [2, 5] },
          { position: "top", distance: 11, fontSize: 10, padding: [1, 4] },
        ];
  const fallbackCandidateStyles = compactMobile
    ? [
        { position: "bottom", distance: 5, fontSize: 8.7, padding: [1, 3] },
        { position: "bottom", distance: 6, fontSize: 8.2, padding: [1, 3] },
      ]
    : mediumMobile
      ? [
          { position: "bottom", distance: 6, fontSize: 9.9, padding: [1, 4] },
          { position: "bottom", distance: 7, fontSize: 9.3, padding: [1, 4] },
        ]
      : [
          { position: "bottom", distance: 6, fontSize: 11, padding: [2, 5] },
          { position: "bottom", distance: 8, fontSize: 10, padding: [1, 4] },
        ];
  const candidateOffsetX = compactMobile
    ? [0, -6, 6, -10, 10, -14, 14, -18, 18]
    : [0, -8, 8, -14, 14, -20, 20, -26, 26];
  const candidateOffsetY = compactMobile ? [0, 2, -2, 4] : [0, 3, -3, 6];
  const peakAnnotations = rendered
    .filter((item) => item.peakMarker && isFiniteNumber(item.peakMarker.value))
    .map((item) => {
      const coord = toPixelCoord(item.peakMarker.month, item.peakMarker.value);
      if (!coord) return null;
      return {
        assetName: item.name,
        monthText: item.peakMarker.month.replace("-", "."),
        anchorX: coord.x,
        anchorY: coord.y,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.anchorX - b.anchorX || b.anchorY - a.anchorY);

  peakAnnotations.forEach((annotation) => {
    const lines = ["最高点", annotation.monthText];
    let bestCandidate = null;

    const evaluateCandidates = (styles, styleRankOffset = 0) => {
      let best = null;
      let bestClear = null;
      let bestNoOverlap = null;

      for (let styleIndex = 0; styleIndex < styles.length; styleIndex += 1) {
        const style = styles[styleIndex];
        const labelBox = estimateLabelBox(lines, style.fontSize, style.padding, 700);

        for (const offsetX of candidateOffsetX) {
          for (const offsetY of candidateOffsetY) {
            const rect = buildLabelRect({
              anchorX: annotation.anchorX,
              anchorY: annotation.anchorY,
              width: labelBox.width,
              height: labelBox.height,
              position: style.position,
              distance: style.distance,
              offsetX,
              offsetY,
            });

            let overlapCount = 0;
            for (const occupied of occupiedRects) {
              if (rectsOverlap(rect, occupied, 3)) overlapCount += 1;
            }

            const overflow = calcRectOverflow(rect, peakLabelBounds);
            const score =
              overlapCount * 100000 +
              overflow * 120 +
              (styleRankOffset + styleIndex) * 40 +
              Math.abs(offsetX) * 8 +
              Math.abs(offsetY);

            const candidate = {
              score,
              style,
              offsetX,
              offsetY,
              rect,
              overlapCount,
              overflow,
            };

            if (!best || candidate.score < best.score) {
              best = candidate;
            }

            if (candidate.overlapCount === 0 && candidate.overflow === 0) {
              if (!bestClear || candidate.score < bestClear.score) {
                bestClear = candidate;
              }
            }

            if (candidate.overlapCount === 0) {
              if (
                !bestNoOverlap ||
                candidate.overflow < bestNoOverlap.overflow ||
                (candidate.overflow === bestNoOverlap.overflow &&
                  candidate.score < bestNoOverlap.score)
              ) {
                bestNoOverlap = candidate;
              }
            }
          }
        }
      }

      return {
        best,
        bestClear,
        bestNoOverlap,
      };
    };

    const topEval = evaluateCandidates(topCandidateStyles, 0);
    if (topEval.bestClear) {
      bestCandidate = topEval.bestClear;
    } else if (topEval.bestNoOverlap && topEval.bestNoOverlap.overflow <= 16) {
      bestCandidate = topEval.bestNoOverlap;
    } else {
      bestCandidate = topEval.best;
      const topHasUsablePlacement =
        topEval.bestNoOverlap && topEval.bestNoOverlap.overflow <= 26;
      if (!topHasUsablePlacement) {
        const fallbackEval = evaluateCandidates(
          fallbackCandidateStyles,
          topCandidateStyles.length,
        );
        if (fallbackEval.bestClear) {
          bestCandidate = fallbackEval.bestClear;
        } else if (fallbackEval.best && (!bestCandidate || fallbackEval.best.score < bestCandidate.score)) {
          bestCandidate = fallbackEval.best;
        }
      }
    }

    if (!bestCandidate) return;
    occupiedRects.push(bestCandidate.rect);
    layoutMap.set(annotation.assetName, {
      position: bestCandidate.style.position,
      distance: bestCandidate.style.distance,
      fontSize: bestCandidate.style.fontSize,
      padding: bestCandidate.style.padding,
      offset: [bestCandidate.offsetX, bestCandidate.offsetY],
    });
  });

  return layoutMap;
}

function downloadByDataURL(dataURL, filename) {
  const anchor = document.createElement("a");
  anchor.href = dataURL;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function loadImageByURL(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image-load-failed"));
    image.src = url;
  });
}

async function captureChartStageSnapshot(pixelRatio = 2) {
  if (!chartStageEl) return null;
  if (typeof window.html2canvas !== "function") return null;

  const stageRect = chartStageEl.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return null;
  const chartTheme = getActiveChartThemeStyle();
  const option = chart.getOption?.() || {};
  const toolboxConfig = Array.isArray(option.toolbox) ? option.toolbox[0] : option.toolbox;
  const toolboxShow = toolboxConfig ? toolboxConfig.show !== false : false;
  const sliderDataZoom = Array.isArray(option.dataZoom)
    ? option.dataZoom.find((item) => item?.type === "slider")
    : null;
  const sliderShow = sliderDataZoom ? sliderDataZoom.show !== false : false;

  if (toolboxShow) {
    chart.setOption(
      {
        toolbox: {
          show: false,
        },
      },
      { lazyUpdate: false },
    );
  }

  if (sliderDataZoom && sliderShow) {
    chart.setOption(
      {
        dataZoom: [
          {
            type: "slider",
            show: false,
          },
        ],
      },
      { lazyUpdate: false },
    );
  }

  let stageCanvas = null;
  try {
    if (toolboxShow || (sliderDataZoom && sliderShow)) {
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    stageCanvas = await window.html2canvas(chartStageEl, {
      backgroundColor: chartTheme.chartBackground,
      scale: pixelRatio,
      useCORS: true,
      logging: false,
    });
  } finally {
    if (toolboxShow) {
      chart.setOption(
        {
          toolbox: {
            show: true,
          },
        },
        { lazyUpdate: false },
      );
    }
    if (sliderDataZoom && sliderShow) {
      chart.setOption(
        {
          dataZoom: [
            {
              type: "slider",
              show: true,
            },
          ],
        },
        { lazyUpdate: false },
      );
    }
  }

  if (!stageCanvas) return null;
  return {
    dataURL: stageCanvas.toDataURL("image/png"),
  };
}

async function exportCurrentChartImage(pixelRatio = 2, label = "标准清晰") {
  if (!latestRenderContext) {
    setStatus("暂无可导出的图表，请先生成。", true);
    return;
  }

  let stageSnapshot = null;
  try {
    stageSnapshot = await captureChartStageSnapshot(pixelRatio);
  } catch (error) {
    stageSnapshot = null;
  }

  if (stageSnapshot?.dataURL) {
    const suffix = pixelRatio >= 4 ? "-ultra-hd" : "";
    const filename = `multi-asset-base100-${latestRenderContext.startMonth}-to-${latestRenderContext.endMonth}${suffix}.png`;
    downloadByDataURL(stageSnapshot.dataURL, filename);
    setStatus(`图片已导出（${label}，与当前页面显示一致）。`, false);
    return;
  }

  const chartTheme = getActiveChartThemeStyle();
  const chartDataUrl = chart.getDataURL({
    type: "png",
    pixelRatio,
    backgroundColor: chartTheme.chartBackground,
    excludeComponents: ["toolbox", "dataZoom"],
  });
  let chartImage;
  try {
    chartImage = await loadImageByURL(chartDataUrl);
  } catch (error) {
    setStatus("导出失败，请重试。", true);
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = chartImage.width;
  canvas.height = chartImage.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    setStatus("导出失败：无法创建画布。", true);
    return;
  }
  ctx.fillStyle = chartTheme.chartBackground;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(chartImage, 0, 0);

  const suffix = pixelRatio >= 4 ? "-ultra-hd" : "";
  const filename = `multi-asset-base100-${latestRenderContext.startMonth}-to-${latestRenderContext.endMonth}${suffix}.png`;
  downloadByDataURL(canvas.toDataURL("image/png"), filename);
  setStatus(`图片已导出（${label}，与当前页面显示一致）。`, false);
}

function findMonthIndexByToken(months, monthValue) {
  if (!Array.isArray(months) || months.length === 0) return -1;
  const token = normalizeMonthToken(monthValue);
  if (!token) return -1;
  for (let i = 0; i < months.length; i += 1) {
    if (normalizeMonthToken(months[i]) === token) return i;
  }
  return -1;
}

function applyTimeZoomFill(startIndex, endIndex, maxIndex) {
  if (!timeZoomFillEl) return;
  if (maxIndex <= 0) {
    timeZoomFillEl.style.left = "0%";
    timeZoomFillEl.style.right = "0%";
    return;
  }
  const startPct = clampNumber((startIndex / maxIndex) * 100, 0, 100);
  const endPct = clampNumber((endIndex / maxIndex) * 100, 0, 100);
  timeZoomFillEl.style.left = `${startPct}%`;
  timeZoomFillEl.style.right = `${Math.max(0, 100 - endPct)}%`;
}

function setTimeZoomDisabled(disabled) {
  if (!timeZoomWidgetEl || !timeZoomStartEl || !timeZoomEndEl || !timeZoomRangeTextEl) return;
  timeZoomWidgetEl.classList.toggle("is-disabled", disabled);
  timeZoomStartEl.disabled = disabled;
  timeZoomEndEl.disabled = disabled;
  if (disabled) {
    timeZoomRangeTextEl.textContent = "-";
    applyTimeZoomFill(0, 0, 0);
  }
}

function syncTimeZoomWidget(months, startMonth, endMonth) {
  if (!timeZoomWidgetEl || !timeZoomStartEl || !timeZoomEndEl || !timeZoomRangeTextEl) return;
  timeZoomMonths = Array.isArray(months) ? [...months] : [];
  if (timeZoomMonths.length === 0) {
    setTimeZoomDisabled(true);
    return;
  }

  const maxIndex = Math.max(0, timeZoomMonths.length - 1);
  timeZoomStartEl.min = "0";
  timeZoomStartEl.max = String(maxIndex);
  timeZoomEndEl.min = "0";
  timeZoomEndEl.max = String(maxIndex);
  timeZoomStartEl.step = "1";
  timeZoomEndEl.step = "1";

  let startIndex = findMonthIndexByToken(timeZoomMonths, startMonth);
  let endIndex = findMonthIndexByToken(timeZoomMonths, endMonth);
  if (startIndex < 0) startIndex = 0;
  if (endIndex < 0) endIndex = maxIndex;
  if (startIndex > endIndex) {
    startIndex = 0;
    endIndex = maxIndex;
  }

  isSyncingTimeZoomInputs = true;
  timeZoomStartEl.value = String(startIndex);
  timeZoomEndEl.value = String(endIndex);
  isSyncingTimeZoomInputs = false;

  const displayStart = timeZoomMonths[startIndex] || startMonth || "";
  const displayEnd = timeZoomMonths[endIndex] || endMonth || "";
  timeZoomRangeTextEl.textContent = `${formatMonthZh(displayStart)} - ${formatMonthZh(displayEnd)}`;
  applyTimeZoomFill(startIndex, endIndex, maxIndex);
  setTimeZoomDisabled(timeZoomMonths.length <= 1);
}

function syncTimeZoomWidgetFromMonthSelects() {
  if (!raw || !Array.isArray(raw.dates) || raw.dates.length === 0) return;
  const selectedStart = startMonthEl.value;
  const selectedEnd = endMonthEl.value;
  const startIndex = raw.dates.indexOf(selectedStart);
  const endIndex = raw.dates.indexOf(selectedEnd);
  if (startIndex < 0 || endIndex < 0 || startIndex > endIndex) {
    setTimeZoomDisabled(true);
    return;
  }

  const months = raw.dates.slice(startIndex, endIndex + 1);
  let nextStartIndex = findMonthIndexByToken(months, uiState.zoomStartMonth);
  let nextEndIndex = findMonthIndexByToken(months, uiState.zoomEndMonth);
  if (nextStartIndex < 0) nextStartIndex = 0;
  if (nextEndIndex < 0) nextEndIndex = months.length - 1;
  if (nextStartIndex > nextEndIndex) {
    nextStartIndex = 0;
    nextEndIndex = months.length - 1;
  }

  const nextStart = months[nextStartIndex];
  const nextEnd = months[nextEndIndex];
  uiState.zoomStartMonth = normalizeMonthToken(nextStart) || nextStart;
  uiState.zoomEndMonth = normalizeMonthToken(nextEnd) || nextEnd;
  syncTimeZoomWidget(months, nextStart, nextEnd);
}

function scheduleRenderFromTimeZoom() {
  if (timeZoomRenderFrame) {
    return;
  }
  timeZoomRenderFrame = requestAnimationFrame(() => {
    timeZoomRenderFrame = null;
    if (isSyncingRangeFromSlider) {
      return;
    }
    isSyncingRangeFromSlider = true;
    try {
      safeRender("滑块区间同步");
    } finally {
      isSyncingRangeFromSlider = false;
    }
  });
}

function applyTimeZoomFromInputs(activeHandle) {
  if (
    isSyncingTimeZoomInputs ||
    !timeZoomStartEl ||
    !timeZoomEndEl ||
    !Array.isArray(timeZoomMonths) ||
    timeZoomMonths.length === 0
  ) {
    return;
  }

  const maxIndex = Math.max(0, timeZoomMonths.length - 1);
  let startIndex = Math.round(clampNumber(Number(timeZoomStartEl.value), 0, maxIndex));
  let endIndex = Math.round(clampNumber(Number(timeZoomEndEl.value), 0, maxIndex));
  if (startIndex > endIndex) {
    if (activeHandle === "start") {
      endIndex = startIndex;
    } else {
      startIndex = endIndex;
    }
  }

  isSyncingTimeZoomInputs = true;
  timeZoomStartEl.value = String(startIndex);
  timeZoomEndEl.value = String(endIndex);
  isSyncingTimeZoomInputs = false;

  const nextStartMonth = timeZoomMonths[startIndex];
  const nextEndMonth = timeZoomMonths[endIndex];
  if (!nextStartMonth || !nextEndMonth) return;

  timeZoomRangeTextEl.textContent = `${formatMonthZh(nextStartMonth)} - ${formatMonthZh(nextEndMonth)}`;
  applyTimeZoomFill(startIndex, endIndex, maxIndex);

  const normalizedStart = normalizeMonthToken(nextStartMonth) || nextStartMonth;
  const normalizedEnd = normalizeMonthToken(nextEndMonth) || nextEndMonth;
  if (uiState.zoomStartMonth === normalizedStart && uiState.zoomEndMonth === normalizedEnd) {
    return;
  }
  uiState.zoomStartMonth = normalizedStart;
  uiState.zoomEndMonth = normalizedEnd;
  scheduleRenderFromTimeZoom();
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
    Number(openValue.toFixed(digits)),
    Number(closeValue.toFixed(digits)),
    Number(normalizedLow.toFixed(digits)),
    Number(normalizedHigh.toFixed(digits)),
  ];
}

function getCloseFromOhlcTuple(tuple) {
  if (!Array.isArray(tuple) || tuple.length < 2) return null;
  const closeValue = Number(tuple[1]);
  return isFiniteNumber(closeValue) ? closeValue : null;
}

function aggregateDailyRowsToMonthOhlcMap(rows, digits = 6) {
  const monthStatsByMonth = new Map();
  const sortedRows = [...rows].sort((a, b) => a.date.localeCompare(b.date));

  sortedRows.forEach((row) => {
    if (!row || !Array.isArray(row.tuple) || row.tuple.length < 4) return;
    const month = normalizeMonthToken(String(row.date).slice(0, 7));
    if (!month) return;

    const openValue = Number(row.tuple[0]);
    const closeValue = Number(row.tuple[1]);
    const lowValue = Number(row.tuple[2]);
    const highValue = Number(row.tuple[3]);
    if (
      !isFiniteNumber(openValue) ||
      !isFiniteNumber(closeValue) ||
      !isFiniteNumber(lowValue) ||
      !isFiniteNumber(highValue)
    ) {
      return;
    }

    const previous = monthStatsByMonth.get(month);
    if (!previous) {
      monthStatsByMonth.set(month, {
        firstDate: row.date,
        lastDate: row.date,
        open: openValue,
        close: closeValue,
        low: lowValue,
        high: highValue,
      });
      return;
    }

    if (row.date < previous.firstDate) {
      previous.firstDate = row.date;
      previous.open = openValue;
    }
    if (row.date >= previous.lastDate) {
      previous.lastDate = row.date;
      previous.close = closeValue;
    }
    if (lowValue < previous.low) previous.low = lowValue;
    if (highValue > previous.high) previous.high = highValue;
  });

  const monthOhlcMap = new Map();
  monthStatsByMonth.forEach((stats, month) => {
    const tuple = buildOhlcTuple(stats.open, stats.close, stats.low, stats.high, digits);
    if (tuple) {
      monthOhlcMap.set(month, tuple);
    }
  });
  return monthOhlcMap;
}

function buildMonthCloseMapFromMonthOhlcMap(monthOhlcMap) {
  const monthValueMap = new Map();
  monthOhlcMap.forEach((tuple, month) => {
    const closeValue = getCloseFromOhlcTuple(tuple);
    if (isFiniteNumber(closeValue)) {
      monthValueMap.set(month, Number(closeValue.toFixed(6)));
    }
  });
  return monthValueMap;
}

function parseStooqCsvToDailyRows(csvText) {
  const rows = [];
  const lines = String(csvText || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .filter(Boolean);
  if (lines.length <= 1) return rows;

  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];
    const cells = line.split(",");
    if (cells.length < 5) continue;
    const date = normalizeDateToken(cells[0]);
    const tuple = buildOhlcTuple(cells[1], cells[4], cells[3], cells[2]);
    if (!date || !tuple) continue;
    rows.push({ date, tuple });
  }
  return rows;
}

function parseStooqCsvToMonthOhlcMap(csvText) {
  return aggregateDailyRowsToMonthOhlcMap(parseStooqCsvToDailyRows(csvText), 6);
}

function parseStooqCsvToMonthMap(csvText) {
  return buildMonthCloseMapFromMonthOhlcMap(parseStooqCsvToMonthOhlcMap(csvText));
}

function parseJsonLoose(text) {
  const raw = String(text || "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    // continue with loose extraction
  }
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch (error) {
    return null;
  }
}

function parseEastmoneyKlineToDailyRows(jsonText) {
  const rows = [];
  const parsed = parseJsonLoose(jsonText);
  const klines = parsed?.data?.klines;
  if (!Array.isArray(klines)) return rows;

  for (const item of klines) {
    const cells = String(item || "").split(",");
    if (cells.length < 5) continue;
    const date = normalizeDateToken(cells[0]);
    const tuple = buildOhlcTuple(cells[1], cells[2], cells[4], cells[3], 6);
    if (!date || !tuple) continue;
    rows.push({ date, tuple });
  }

  return rows;
}

function parseEastmoneyKlineToMonthOhlcMap(jsonText) {
  return aggregateDailyRowsToMonthOhlcMap(parseEastmoneyKlineToDailyRows(jsonText), 6);
}

function parseEastmoneyKlineToMonthMap(jsonText) {
  return buildMonthCloseMapFromMonthOhlcMap(parseEastmoneyKlineToMonthOhlcMap(jsonText));
}

function stripUrlProtocol(url) {
  return String(url || "").replace(/^https?:\/\//i, "");
}

function isResponseBodyUsable(sourceUrl, text) {
  const body = String(text || "").trim();
  if (!body) return false;

  const loweredSourceUrl = String(sourceUrl || "").toLowerCase();
  if (loweredSourceUrl.includes("stooq.com")) {
    if (body.includes("Exceeded the daily hits limit")) return false;
    return /(?:^|\n)Date,Open,High,Low,Close(?:,Volume)?(?:\r?\n|$)/i.test(body);
  }
  if (loweredSourceUrl.includes("eastmoney.com")) {
    return body.includes("klines") && body.includes("{");
  }
  return true;
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
      if (isResponseBodyUsable(url, text)) {
        return text;
      }
      lastError = new Error(`received unusable payload from ${candidate}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`fetch failed: ${url}`);
}

function caseShillerSeriesUrl(seriesId, startDate = "") {
  const url = new URL("https://fred.stlouisfed.org/graph/fredgraph.csv");
  url.searchParams.set("id", seriesId);
  if (startDate) {
    url.searchParams.set("cosd", startDate);
  }
  return url.toString();
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
      chinaSourceKey: sourceKey,
      chinaSourceLabel: sourceName,
      source: city.source || sourceName,
      unit: "指数",
    });
  }
  return { assets, seriesById };
}

function pickDefaultAssets(assetList) {
  const selected = [];
  const addByPredicate = (predicate) => {
    const matched = assetList.find((asset) => predicate(asset) && !selected.includes(asset.id));
    if (matched) {
      selected.push(matched.id);
    }
  };

  addByPredicate(
    (asset) =>
      asset?.categoryKey === "cn_housing" &&
      asset?.chinaSourceKey === "centaline" &&
      String(asset?.name || "").includes("北京"),
  );
  addByPredicate(
    (asset) =>
      asset?.categoryKey === "cn_housing" &&
      asset?.chinaSourceKey === "centaline" &&
      String(asset?.name || "").includes("上海"),
  );
  addByPredicate(
    (asset) =>
      String(asset?.id || "") === "metal_gold_spot_usd" ||
      String(asset?.name || "").includes("黄金"),
  );
  addByPredicate(
    (asset) =>
      String(asset?.id || "") === "equity_sp500" ||
      String(asset?.name || "").includes("标普500"),
  );

  return new Set(selected.slice(0, 4));
}

function inferChinaSourceKey(asset) {
  const byKey = String(asset?.chinaSourceKey || asset?.subgroupKey || "").toLowerCase();
  const byId = String(asset?.id || "").toLowerCase();
  if (byKey.includes("nbs") || byId.startsWith("cn_nbs70_")) return "nbs70";
  return "centaline";
}

function isUsableMultiAssetDataset(data) {
  if (!data || typeof data !== "object") return false;
  if (!Array.isArray(data.dates) || data.dates.length === 0) return false;
  if (!Array.isArray(data.assets) || data.assets.length === 0) return false;
  if (!data.values || typeof data.values !== "object") return false;
  return true;
}

function normalizeMultiAssetDataset(inputData) {
  const data = JSON.parse(JSON.stringify(inputData));
  const months = Array.isArray(data.dates) ? data.dates : [];
  const values = data.values && typeof data.values === "object" ? data.values : {};
  const ohlcValues = data.ohlcValues && typeof data.ohlcValues === "object" ? data.ohlcValues : {};
  data.ohlcValues = ohlcValues;

  data.assets = Array.isArray(data.assets) ? data.assets : [];
  data.assets.forEach((asset) => {
    if (!asset || typeof asset !== "object") return;
    let categoryKey = String(asset.categoryKey || "").trim();
    if (categoryKey === "crypto") {
      categoryKey = "equities";
      asset.categoryKey = "equities";
      asset.categoryLabel = "权益类资产";
    }
    if (categoryKey === "cn_housing") {
      const sourceKey = inferChinaSourceKey(asset);
      asset.chinaSourceKey = sourceKey;
      asset.chinaSourceLabel = sourceKey === "nbs70" ? "统计局70城" : "中原6城";
      asset.subgroupLabel = sourceKey === "nbs70" ? "中国房产（统计局70城）" : "中国房产（中原6城）";
    } else if (categoryKey === "us_housing") {
      asset.subgroupLabel = "美国房产（Case-Shiller）";
    } else if (categoryKey === "metals") {
      asset.subgroupLabel = "贵金属";
    } else if (categoryKey === "equities") {
      asset.subgroupLabel = "权益类资产";
    }

    const series = Array.isArray(values[asset.id]) ? values[asset.id] : [];
    if (!asset.availableRange && series.length > 0) {
      asset.availableRange = buildAvailableRange(series, months);
    }

    if (Array.isArray(ohlcValues[asset.id])) {
      ohlcValues[asset.id] = ohlcValues[asset.id].slice(0, months.length).map((tuple) => {
        if (!Array.isArray(tuple) || tuple.length < 4) return null;
        return buildOhlcTuple(tuple[0], tuple[1], tuple[2], tuple[3], 6);
      });
    }
  });

  data.categories = [
    { key: "cn_housing", label: "中国房产" },
    { key: "us_housing", label: "美国房产" },
    { key: "metals", label: "贵金属" },
    { key: "equities", label: "权益类资产" },
  ];
  if (!Array.isArray(data.warnings)) {
    data.warnings = [];
  }
  return data;
}

async function buildMultiAssetDataset() {
  const warnings = [];
  const assets = [];
  const seriesById = new Map();
  const ohlcById = new Map();

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

  const equityTasks = EQUITY_SERIES.map(async (target) => {
    try {
      let resolvedMap = new Map();
      let resolvedOhlcMap = new Map();
      if (target.parser === "stooq" && target.url) {
        const csvText = await fetchTextResilient(target.url);
        resolvedMap = parseStooqCsvToMonthMap(csvText);
        resolvedOhlcMap = parseStooqCsvToMonthOhlcMap(csvText);
      } else if (target.parser === "eastmoney" && target.url) {
        const jsonText = await fetchTextResilient(target.url);
        resolvedMap = parseEastmoneyKlineToMonthMap(jsonText);
        resolvedOhlcMap = parseEastmoneyKlineToMonthOhlcMap(jsonText);
      } else if (target.seriesId) {
        const csvText = await fetchTextResilient(caseShillerSeriesUrl(target.seriesId));
        resolvedMap = parseFredCsvToMonthMap(csvText);
      }
      if (
        (!(resolvedMap instanceof Map) || resolvedMap.size === 0) &&
        resolvedOhlcMap instanceof Map &&
        resolvedOhlcMap.size > 0
      ) {
        resolvedMap = new Map();
        resolvedOhlcMap.forEach((tuple, month) => {
          const closeValue = getCloseFromOhlcTuple(tuple);
          if (isFiniteNumber(closeValue)) {
            resolvedMap.set(month, closeValue);
          }
        });
      }
      if (!(resolvedMap instanceof Map) || resolvedMap.size === 0) {
        throw new Error("empty-series");
      }
      assets.push({
        id: target.id,
        name: target.name,
        legendName: target.legendName,
        categoryKey: "equities",
        categoryLabel: "权益类资产",
        subgroupLabel: "权益类资产",
        source: target.source || "权益类资产",
        unit: "指数",
      });
      seriesById.set(target.id, resolvedMap);
      if (resolvedOhlcMap instanceof Map && resolvedOhlcMap.size > 0) {
        ohlcById.set(target.id, resolvedOhlcMap);
      }
    } catch (error) {
      warnings.push(`${target.legendName} 加载失败。`);
    }
  });

  await Promise.all([...caseShillerTasks, ...metalTasks, ...equityTasks]);

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
  const ohlcValues = {};

  assets.forEach((asset) => {
    const sourceMap = seriesById.get(asset.id) || new Map();
    const series = dates.map((month) => {
      const value = Number(sourceMap.get(month));
      return isFiniteNumber(value) ? Number(value.toFixed(6)) : null;
    });
    asset.availableRange = buildAvailableRange(series, dates);
    values[asset.id] = series;

    const ohlcMap = ohlcById.get(asset.id);
    if (ohlcMap instanceof Map && ohlcMap.size > 0) {
      const seriesOhlc = dates.map((month) => {
        const tuple = ohlcMap.get(month);
        if (!Array.isArray(tuple) || tuple.length < 4) return null;
        return buildOhlcTuple(tuple[0], tuple[1], tuple[2], tuple[3], 6);
      });
      if (seriesOhlc.some((tuple) => Array.isArray(tuple))) {
        ohlcValues[asset.id] = seriesOhlc;
      }
    }
  });

  const categories = [
    { key: "cn_housing", label: "中国房产" },
    { key: "us_housing", label: "美国房产" },
    { key: "metals", label: "贵金属" },
    { key: "equities", label: "权益类资产" },
  ];

  return {
    generatedAt: new Date().toISOString(),
    baseMonth: BASE_START_MONTH,
    dates,
    assets,
    values,
    ohlcValues,
    categories,
    warnings,
  };
}

function getCategoryModuleOrder(categoryKey) {
  const idx = CATEGORY_MODULES.findIndex((module) => module.key === categoryKey);
  return idx >= 0 ? idx : Number.MAX_SAFE_INTEGER;
}

function sortAssetsForUi(assetList) {
  return [...assetList].sort((a, b) => {
    const aModuleOrder = getCategoryModuleOrder(a.categoryKey);
    const bModuleOrder = getCategoryModuleOrder(b.categoryKey);
    if (aModuleOrder !== bModuleOrder) return aModuleOrder - bModuleOrder;

    if (a.categoryKey === "cn_housing" && b.categoryKey === "cn_housing") {
      const sourceOrder = {
        centaline: 0,
        nbs70: 1,
      };
      const aSourceOrder = sourceOrder[a.chinaSourceKey] ?? Number.MAX_SAFE_INTEGER;
      const bSourceOrder = sourceOrder[b.chinaSourceKey] ?? Number.MAX_SAFE_INTEGER;
      if (aSourceOrder !== bSourceOrder) return aSourceOrder - bSourceOrder;
    }

    return String(a.legendName || a.name).localeCompare(String(b.legendName || b.name), "zh-CN");
  });
}

function getAssetPickerLabel(asset) {
  if (!asset) return "";
  if (asset.categoryKey === "cn_housing") {
    const cityMatch = String(asset.name || "").match(/·([^·]+)$/);
    if (cityMatch && cityMatch[1]) return cityMatch[1];
  }
  return stripAssetDisplayQualifier(asset.legendName || asset.name || "");
}

function stripAssetDisplayQualifier(label) {
  return String(label || "")
    .replace(/\s*[（(][^（）()]*[）)]\s*$/g, "")
    .trim();
}

function appendHousingSuffix(label) {
  const trimmed = String(label || "").trim();
  if (!trimmed) return "";
  if (trimmed.endsWith("房产")) return trimmed;
  return `${trimmed}房产`;
}

function getAssetDisplayName(asset) {
  if (!asset || typeof asset !== "object") return "";
  if (asset.categoryKey === "cn_housing") {
    const cityMatch = String(asset.name || "").match(/·([^·]+)$/);
    const cityName =
      cityMatch && cityMatch[1]
        ? cityMatch[1]
        : stripAssetDisplayQualifier(asset.legendName || asset.name || "");
    return appendHousingSuffix(cityName);
  }
  if (asset.categoryKey === "us_housing") {
    const cityName = stripAssetDisplayQualifier(asset.legendName || asset.name || "");
    return appendHousingSuffix(cityName);
  }
  return stripAssetDisplayQualifier(asset.legendName || asset.name || "");
}

function buildAssetControls(assetList) {
  assetById.clear();
  sortAssetsForUi(assetList).forEach((asset) => {
    assetById.set(asset.id, asset);
  });

  const defaultSelected = pickDefaultAssets(assetList);
  const groupedByCategory = new Map();

  sortAssetsForUi(assetList).forEach((asset) => {
    if (!groupedByCategory.has(asset.categoryKey)) {
      groupedByCategory.set(asset.categoryKey, []);
    }
    groupedByCategory.get(asset.categoryKey).push(asset);
  });

  const html = [];
  CATEGORY_MODULES.forEach((module) => {
    const items = groupedByCategory.get(module.key) || [];
    html.push(`<section class="asset-group asset-module" data-category="${module.key}">`);
    html.push('<div class="asset-module-head">');
    html.push(`<h4 class="asset-group-title asset-module-title">${module.title}</h4>`);
    if (module.description) {
      html.push(`<p class="asset-module-desc">${module.description}</p>`);
    }
    html.push("</div>");

    if (module.key === "cn_housing") {
      const sourceSwitchHtml = CHINA_SOURCE_MODE_CONFIG
        .map((config) => {
          const activeClass = config.key === uiState.chinaSourceMode ? " is-active" : "";
          return `<button type="button" class="china-source-chip${activeClass}" data-cn-source-mode="${config.key}">${config.label}</button>`;
        })
        .join("");
      html.push('<div class="asset-module-toolbar">');
      html.push('<span class="asset-module-toolbar-label">数据源</span>');
      html.push(`<div class="china-source-switch">${sourceSwitchHtml}</div>`);
      html.push("</div>");
    }

    if (items.length === 0) {
      html.push('<p class="asset-module-empty">该模块暂无可用数据。</p>');
    } else {
      html.push('<div class="asset-grid">');
      items.forEach((asset) => {
        const checked = defaultSelected.has(asset.id) ? "checked" : "";
        const chinaSource = asset.chinaSourceKey || "";
        const pickerLabel = getAssetPickerLabel(asset);
        html.push(
          `<label class="asset-item" data-name="${asset.name} ${asset.legendName} ${pickerLabel}" data-picker-label="${pickerLabel}" data-category="${asset.categoryKey}" data-cn-source="${chinaSource}">` +
            `<input type="checkbox" value="${asset.id}" ${checked} />` +
            `<span>${pickerLabel}</span>` +
          "</label>",
        );
      });
      html.push("</div>");
    }

    html.push("</section>");
  });

  assetListEl.innerHTML = html.join("");
  syncAssetSelectionCapacityUi();
}

function matchesChinaSourceMode(asset, mode = uiState.chinaSourceMode) {
  if (!asset || asset.categoryKey !== "cn_housing") return true;
  return asset.chinaSourceKey === mode;
}

function syncChinaSourceSwitchUi() {
  const chips = assetListEl.querySelectorAll(".china-source-chip");
  chips.forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.cnSourceMode === uiState.chinaSourceMode);
  });
}

function syncChinaSourceSwitchVisibility({ hasKeyword = false, sourceMatchCount = null } = {}) {
  const chinaModule = assetListEl.querySelector('.asset-module[data-category="cn_housing"]');
  if (!chinaModule) return;
  const toolbar = chinaModule.querySelector(".asset-module-toolbar");
  const switchWrap = chinaModule.querySelector(".china-source-switch");
  if (!toolbar || !switchWrap) return;
  const chips = [...switchWrap.querySelectorAll(".china-source-chip")];
  const toolbarLabel = toolbar.querySelector(".asset-module-toolbar-label");

  if (!hasKeyword) {
    chips.forEach((chip) => chip.classList.remove("china-source-chip-hidden"));
    switchWrap.classList.remove("is-single");
    toolbar.classList.remove("is-hidden");
    if (toolbarLabel) toolbarLabel.classList.remove("is-hidden");
    return;
  }

  let visibleChipCount = 0;
  chips.forEach((chip) => {
    const mode = String(chip.dataset.cnSourceMode || "");
    const matchCount = sourceMatchCount instanceof Map ? Number(sourceMatchCount.get(mode) || 0) : 0;
    const showChip = matchCount > 0;
    chip.classList.toggle("china-source-chip-hidden", !showChip);
    if (showChip) visibleChipCount += 1;
  });

  switchWrap.classList.toggle("is-single", visibleChipCount <= 1);
  toolbar.classList.toggle("is-hidden", visibleChipCount === 0);
  if (toolbarLabel) {
    toolbarLabel.classList.toggle("is-hidden", visibleChipCount <= 1);
  }
}

function syncChinaHousingGridLayout() {
  const chinaModule = assetListEl.querySelector('.asset-module[data-category="cn_housing"]');
  if (!chinaModule) return;
  const isNbsMode = uiState.chinaSourceMode === "nbs70";
  chinaModule.classList.toggle("is-nbs-three-cols", isNbsMode);
  assetListEl.classList.toggle("is-cn-nbs70", isNbsMode);
  assetListEl.classList.toggle("is-cn-centaline", !isNbsMode);
}

function syncUsHousingGridViewportHeight() {
  const usModule = assetListEl.querySelector('.asset-module[data-category="us_housing"]');
  const usGrid = usModule?.querySelector(".asset-grid");
  if (!usGrid) return;

  usGrid.style.removeProperty("height");
  usGrid.style.removeProperty("max-height");

  if (!usModule || usModule.classList.contains("asset-group-hidden")) return;
  if (uiState.chinaSourceMode !== "nbs70") return;
  if (String(assetSearchEl?.value || "").trim()) return;

  const pageRoot = document.querySelector(".page-multi-assets");
  const rootStyle = window.getComputedStyle(pageRoot || document.documentElement);
  const rowHeight = Number.parseFloat(rootStyle.getPropertyValue("--asset-row-height")) || 24;
  const rowGap = Number.parseFloat(rootStyle.getPropertyValue("--asset-row-gap")) || 6;
  const visibleRows = Number.parseFloat(rootStyle.getPropertyValue("--housing-module-visible-rows")) || 5;
  const baseGridHeight = Math.round((rowHeight * visibleRows) + (rowGap * Math.max(0, visibleRows - 1)));

  const moduleRect = usModule.getBoundingClientRect();
  const gridRect = usGrid.getBoundingClientRect();
  if (!moduleRect.height || !gridRect.height) return;

  const moduleStyle = window.getComputedStyle(usModule);
  const paddingBottom = Number.parseFloat(moduleStyle.paddingBottom) || 0;
  const availableHeight = Math.floor(moduleRect.bottom - paddingBottom - gridRect.top);
  if (availableHeight > baseGridHeight + 10) {
    usGrid.style.height = `${availableHeight}px`;
    usGrid.style.maxHeight = `${availableHeight}px`;
  }
}

function applyChinaSourceMode(nextMode, { announce = true } = {}) {
  const safeMode = CHINA_SOURCE_MODE_CONFIG.some((item) => item.key === nextMode)
    ? nextMode
    : CHINA_SOURCE_MODE_CONFIG[0].key;
  uiState.chinaSourceMode = safeMode;
  syncChinaSourceSwitchUi();
  syncChinaHousingGridLayout();

  let removedCount = 0;
  const checkboxes = assetListEl.querySelectorAll('.asset-item input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const asset = assetById.get(checkbox.value);
    if (!matchesChinaSourceMode(asset, safeMode) && checkbox.checked) {
      checkbox.checked = false;
      removedCount += 1;
    }
  });

  applyAssetSearchFilter();
  syncAssetSelectionCapacityUi();
  syncUsHousingGridViewportHeight();
  if (announce) {
    const activeLabel =
      CHINA_SOURCE_MODE_CONFIG.find((item) => item.key === safeMode)?.label || safeMode;
    if (removedCount > 0) {
      setStatus(`中国房产已切换为${activeLabel}，并移除 ${removedCount} 个不匹配选项。`, false);
    } else {
      setStatus(`中国房产已切换为${activeLabel}。`, false);
    }
  }
}

function readSelectedAssetIds() {
  return [...assetListEl.querySelectorAll('input[type="checkbox"]:checked')]
    .map((input) => input.value)
    .filter((id) => assetById.has(id));
}

function syncAssetSelectionCapacityUi() {
  const inputList = [...assetListEl.querySelectorAll('input[type="checkbox"]')];
  const checkedCount = inputList.reduce(
    (count, input) => count + ((input instanceof HTMLInputElement && input.checked) ? 1 : 0),
    0,
  );
  const isFull = checkedCount >= MAX_SELECTED_ASSET_COUNT;

  inputList.forEach((input) => {
    if (!(input instanceof HTMLInputElement)) return;
    const shouldDisable = isFull && !input.checked;
    input.disabled = shouldDisable;
    const label = input.closest(".asset-item");
    if (label) {
      label.classList.toggle("is-selection-limit-disabled", shouldDisable);
    }
  });
}

function enforceAssetSelectionLimit(changedInput = null) {
  const checkedInputs = [...assetListEl.querySelectorAll('input[type="checkbox"]:checked')];
  if (checkedInputs.length <= MAX_SELECTED_ASSET_COUNT) {
    syncAssetSelectionCapacityUi();
    return true;
  }

  if (changedInput && changedInput.checked) {
    changedInput.checked = false;
  } else {
    checkedInputs.slice(MAX_SELECTED_ASSET_COUNT).forEach((input) => {
      input.checked = false;
    });
  }
  syncAssetSelectionCapacityUi();
  return false;
}

function applyAssetSearchFilter() {
  const keyword = String(assetSearchEl.value || "").trim().toLowerCase();
  const hasKeyword = Boolean(keyword);
  assetListEl.classList.toggle("is-searching", hasKeyword);
  const chinaModule = assetListEl.querySelector('.asset-module[data-category="cn_housing"]');
  if (chinaModule) {
    chinaModule.classList.toggle("is-searching", hasKeyword);
  }
  const chinaSourceMatchCount = new Map(
    CHINA_SOURCE_MODE_CONFIG.map((item) => [item.key, 0]),
  );
  const labelMetaList = [];
  const labels = [...assetListEl.querySelectorAll(".asset-item")];
  labels.forEach((label) => {
    const text = String(label.dataset.name || "").toLowerCase();
    const checkbox = label.querySelector('input[type="checkbox"]');
    const asset = checkbox ? assetById.get(checkbox.value) : null;
    const showBySearch = !hasKeyword || text.includes(keyword);
    if (hasKeyword && showBySearch && asset?.categoryKey === "cn_housing" && asset?.chinaSourceKey) {
      chinaSourceMatchCount.set(
        asset.chinaSourceKey,
        Number(chinaSourceMatchCount.get(asset.chinaSourceKey) || 0) + 1,
      );
    }
    labelMetaList.push({
      label,
      checkbox,
      asset,
      showBySearch,
    });
  });

  if (hasKeyword) {
    const currentModeMatchCount = Number(chinaSourceMatchCount.get(uiState.chinaSourceMode) || 0);
    if (currentModeMatchCount === 0) {
      const fallbackMode = CHINA_SOURCE_MODE_CONFIG.find(
        (item) => Number(chinaSourceMatchCount.get(item.key) || 0) > 0,
      )?.key;
      if (fallbackMode && fallbackMode !== uiState.chinaSourceMode) {
        uiState.chinaSourceMode = fallbackMode;
        syncChinaSourceSwitchUi();
        syncChinaHousingGridLayout();
      }
    }
  }

  const visibleCountByCategory = new Map();
  labelMetaList.forEach((meta) => {
    const { label, asset, showBySearch } = meta;
    const passesSourceFilter = matchesChinaSourceMode(asset, uiState.chinaSourceMode);
    const show = passesSourceFilter && showBySearch;
    label.classList.toggle("asset-item-hidden", !show);
    if (show) {
      const categoryKey = String(label.dataset.category || asset?.categoryKey || "");
      if (categoryKey) {
        visibleCountByCategory.set(
          categoryKey,
          Number(visibleCountByCategory.get(categoryKey) || 0) + 1,
        );
      }
    }

    const textNode = label.querySelector("span");
    if (textNode) {
      const baseLabel = String(label.dataset.pickerLabel || textNode.textContent || "").trim();
      if (textNode.textContent !== baseLabel) {
        textNode.textContent = baseLabel;
      }
    }
  });

  syncChinaSourceSwitchVisibility({
    hasKeyword,
    sourceMatchCount: chinaSourceMatchCount,
  });

  [...assetListEl.querySelectorAll(".asset-group")].forEach((group) => {
    const categoryKey = String(group.getAttribute("data-category") || "");
    const visibleCount = Number(visibleCountByCategory.get(categoryKey) || 0);
    const hasEmptyBlock = group.querySelector(".asset-module-empty");
    const showGroup = hasKeyword ? visibleCount > 0 : visibleCount > 0 || Boolean(hasEmptyBlock);
    group.classList.toggle("asset-group-hidden", !showGroup);
  });

  syncUsHousingGridViewportHeight();
}

function buildMonthSelects(dates) {
  const options = dates.map((month) => `<option value="${month}">${formatMonthZh(month)}</option>`).join("");
  startMonthEl.innerHTML = options;
  endMonthEl.innerHTML = options;

  const defaultStart = dates.includes(BASE_START_MONTH) ? BASE_START_MONTH : dates[0];
  startMonthEl.value = defaultStart;
  endMonthEl.value = dates[dates.length - 1];
  syncTimeZoomWidgetFromMonthSelects();
}

function getOverlayColumnRatios(isCrossSource) {
  return isCrossSource
    ? [0.34, 0.22, 0.22, 0.22]
    : [0.34, 0.22, 0.22, 0.22];
}

function resolveOverlayPresentation(rows) {
  return {
    isCrossSource: false,
    headerLabel: "资产",
    sourceNoteText: summarizeSourceProviders(
      (rows || []).map((row) => row.sourceLabel),
      { maxItems: 5, fallback: "综合整理" },
    ),
  };
}

function formatOverlayAssetCellHtml(row, isCrossSource) {
  return row.name || "-";
}

function renderChartStatsOverlay(rows, startMonth, endMonth) {
  if (!chartStatsOverlayEl) return;
  if (!uiState.showChartTable || !Array.isArray(rows) || rows.length === 0) {
    chartStatsOverlayEl.classList.remove("show");
    chartStatsOverlayEl.classList.remove("is-cross-source");
    chartStatsOverlayEl.innerHTML = "";
    syncChartViewport({ resizeChart: false });
    return;
  }

  const { isCrossSource, headerLabel, sourceNoteText } = resolveOverlayPresentation(rows);
  const rangeLabel = formatOverlayRangeLabel(startMonth, endMonth);
  const rangeHtml = buildOverlayRangeHtml(startMonth, endMonth);
  const baseLabel = formatOverlayBaseLabel(startMonth);
  const baseValueHtml = buildOverlayBaseValueHtml(startMonth);

  const orderedRows = [...rows].sort((a, b) => {
    const normalizeOrderName = (value) =>
      String(value || "")
        .replace(/房产$/g, "")
        .trim();
    const aName = String(a.name || "");
    const bName = String(b.name || "");
    const aOrderName = normalizeOrderName(aName);
    const bOrderName = normalizeOrderName(bName);
    const aRank = OVERLAY_CITY_ORDER_INDEX.has(aOrderName)
      ? OVERLAY_CITY_ORDER_INDEX.get(aOrderName)
      : Number.MAX_SAFE_INTEGER;
    const bRank = OVERLAY_CITY_ORDER_INDEX.has(bOrderName)
      ? OVERLAY_CITY_ORDER_INDEX.get(bOrderName)
      : Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return aOrderName.localeCompare(bOrderName, "zh-CN");
  });
  const colRatios = getOverlayColumnRatios(isCrossSource);
  const colGroupHtml = `<colgroup>${colRatios
    .map((ratio) => `<col style="width:${(ratio * 100).toFixed(2)}%">`)
    .join("")}</colgroup>`;

  const bodyRows = orderedRows
    .map((row) => {
      const cumulativeText = formatPercent(row.cumulativePct, 1);
      const annualizedText = formatPercent(row.annualizedPct, 1);
      const maxDrawdownText = formatPercent(row.maxDrawdownPct, 1);
      return `<tr>
        <td>${formatOverlayAssetCellHtml(row, isCrossSource)}</td>
        <td>${cumulativeText}</td>
        <td>${annualizedText}</td>
        <td>${maxDrawdownText}</td>
      </tr>`;
    })
    .join("");

  chartStatsOverlayEl.innerHTML = `
    <div class="chart-stats-title-main">多资产价格指数：核心资产</div>
    <div class="chart-stats-title-sub chart-stats-title-range" aria-label="${rangeLabel}">${rangeHtml}</div>
    <div class="chart-stats-title-sub chart-stats-title-base" aria-label="${baseLabel}">
      <span class="chart-stats-base-prefix">定基</span><span class="chart-stats-base-value">${baseValueHtml}</span>
    </div>
    <table>
      ${colGroupHtml}
      <thead>
        <tr>
          <th><span class="chart-stats-th-text">${headerLabel}</span></th>
          <th><span class="chart-stats-th-text">累计涨幅</span></th>
          <th><span class="chart-stats-th-text">年化涨幅</span></th>
          <th><span class="chart-stats-th-text">最大回撤</span></th>
        </tr>
      </thead>
      <tbody>${bodyRows}</tbody>
    </table>
    <div class="chart-stats-note">*数据来源：${sourceNoteText}</div>
    <div class="chart-stats-note">*图表制作：公众号 - 一座独立屋</div>
  `;
  chartStatsOverlayEl.classList.add("show");
  chartStatsOverlayEl.classList.toggle("is-cross-source", isCrossSource);
  syncChartViewport({ resizeChart: false });
}

function renderSummaryTable(rows) {
  summaryBodyEl.innerHTML = "";
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = [
      row.name,
      formatNumber(row.baseRaw, 2),
      `${formatNumber(row.peakValue, 1)} (${row.peakDate || "-"})`,
      `${formatNumber(row.latestValue, 1)} (${row.latestDate || "-"})`,
      formatPercent(row.momPct, 1),
      formatPercent(row.yoyPct, 1),
      formatPercent(row.drawdownFromPeakPct, 1),
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

function getAssetSeriesColor(asset, index) {
  const mode = getCurrentThemeMode();
  const fixedMap = METAL_FIXED_COLORS[mode] || METAL_FIXED_COLORS[THEME_MODE_LIGHT];
  const assetId = String(asset?.id || "");
  if (Object.prototype.hasOwnProperty.call(fixedMap, assetId)) {
    return fixedMap[assetId];
  }
  return getSeriesColor(index);
}

function makeOption(rendered, months, viewportStartMonth, viewportEndMonth) {
  const axisMonths = months.map((month) => normalizeMonthToken(month));
  const monthToAxisMap = new Map();
  axisMonths.forEach((axisMonth, index) => {
    const rawMonth = String(months[index] || "").trim();
    if (rawMonth && axisMonth) {
      monthToAxisMap.set(rawMonth, axisMonth);
    }
    if (axisMonth) {
      monthToAxisMap.set(axisMonth, axisMonth);
    }
  });
  const toAxisMonth = (month) => {
    const rawText = String(month || "").trim();
    if (!rawText) return "";
    if (monthToAxisMap.has(rawText)) {
      return monthToAxisMap.get(rawText);
    }
    const normalized = normalizeMonthToken(rawText);
    if (monthToAxisMap.has(normalized)) {
      return monthToAxisMap.get(normalized);
    }
    return normalized || rawText;
  };

  const zoomStartToken =
    typeof viewportStartMonth === "string" ? normalizeMonthToken(viewportStartMonth) : undefined;
  const zoomEndToken =
    typeof viewportEndMonth === "string" ? normalizeMonthToken(viewportEndMonth) : undefined;
  let visibleStartIndex = 0;
  let visibleEndIndex = Math.max(0, months.length - 1);
  if (typeof zoomStartToken === "string") {
    const idx = axisMonths.indexOf(zoomStartToken);
    if (idx >= 0) visibleStartIndex = idx;
  }
  if (typeof zoomEndToken === "string") {
    const idx = axisMonths.indexOf(zoomEndToken);
    if (idx >= 0) visibleEndIndex = idx;
  }
  if (visibleStartIndex > visibleEndIndex) {
    const temp = visibleStartIndex;
    visibleStartIndex = visibleEndIndex;
    visibleEndIndex = temp;
  }

  const legendLabelMap = new Map(
    rendered.map((item) => [item.seriesName || item.id || item.name, item.name || "-"]),
  );
  const selectedMap = Object.fromEntries(
    rendered.map((item) => [
      item.seriesName || item.id || item.name,
      !uiState.hiddenAssetNames.has(item.seriesName || item.id || item.name),
    ]),
  );
  const chartWidth = chart.getWidth();
  const responsiveChartWidth = getResponsiveChartWidth(chartWidth);
  const gridLayout = resolveChartGridLayout(chartWidth);
  const compactMobile = responsiveChartWidth <= 520;
  const mediumMobile = responsiveChartWidth > 520 && responsiveChartWidth <= 760;
  const longestEndLabelLength = rendered.reduce(
    (maxLength, item) => Math.max(maxLength, String(item.endLabelMain || item.name || "").length),
    0,
  );
  const baseGridRight = clampNumber(
    Math.max(
      gridLayout.right,
      responsiveChartWidth <= 520 ? 68 : responsiveChartWidth <= 760 ? 96 : 122,
      28 + longestEndLabelLength * (responsiveChartWidth <= 520 ? 6.6 : 8.1),
    ),
    gridLayout.right,
    220,
  );
  let gridLeft = gridLayout.left;
  let gridRight = baseGridRight;

  const basePlotWidth = Math.max(220, chartWidth - gridLeft - gridRight);
  const targetPlotWidth = Math.min(
    Math.max(220, chartWidth - 18),
    Math.round(basePlotWidth * CHART_AXIS_WIDTH_SCALE),
  );
  const targetPadding = Math.max(18, chartWidth - targetPlotWidth);
  let reductionNeeded = Math.max(0, gridLeft + gridRight - targetPadding);

  if (reductionNeeded > 0) {
    const minGridLeft = compactMobile ? 44 : mediumMobile ? 52 : 58;
    const minGridRight = compactMobile ? 56 : mediumMobile ? 76 : 96;
    const paddingBase = Math.max(1, gridLeft + gridRight);

    const preferredLeftReduction = Math.min(
      Math.max(0, gridLeft - minGridLeft),
      Math.round((gridLeft / paddingBase) * reductionNeeded),
    );
    gridLeft -= preferredLeftReduction;
    reductionNeeded -= preferredLeftReduction;

    const preferredRightReduction = Math.min(
      Math.max(0, gridRight - minGridRight),
      reductionNeeded,
    );
    gridRight -= preferredRightReduction;
    reductionNeeded -= preferredRightReduction;

    if (reductionNeeded > 0) {
      const extraLeftReduction = Math.min(Math.max(0, gridLeft - minGridLeft), reductionNeeded);
      gridLeft -= extraLeftReduction;
      reductionNeeded -= extraLeftReduction;
    }
    if (reductionNeeded > 0) {
      const extraRightReduction = Math.min(Math.max(0, gridRight - minGridRight), reductionNeeded);
      gridRight -= extraRightReduction;
      reductionNeeded -= extraRightReduction;
    }
  }

  const allFiniteValues = [];
  rendered.forEach((item) => {
    if (item.seriesType === "candlestick" && Array.isArray(item.normalizedOhlc)) {
      item.normalizedOhlc.forEach((tuple) => {
        if (!Array.isArray(tuple)) return;
        tuple.forEach((value) => {
          if (isFiniteNumber(value)) {
            allFiniteValues.push(value);
          }
        });
      });
      return;
    }
    if (Array.isArray(item.normalized)) {
      item.normalized.forEach((value) => {
        if (isFiniteNumber(value)) {
          allFiniteValues.push(value);
        }
      });
    }
  });
  const yMin = allFiniteValues.length > 0 ? Math.min(...allFiniteValues) : 80;
  const yMax = allFiniteValues.length > 0 ? Math.max(...allFiniteValues) : 120;
  const effectivePlotWidth = Math.max(220, chartWidth - gridLeft - gridRight);
  const usableChartWidth = Math.max(
    220,
    effectivePlotWidth - (responsiveChartWidth <= 760 ? 12 : 24),
  );
  const labelGapMonths = Math.max(
    4,
    Math.round((92 * Math.max(1, months.length - 1)) / usableChartWidth),
  );
  const xAxisLabelLayout = resolveXAxisLabelLayout(
    axisMonths,
    chartWidth,
    visibleStartIndex,
    visibleEndIndex,
    {
      ...gridLayout,
      left: gridLeft,
      right: gridRight,
    },
  );
  const endLabelBaseFontSize = compactMobile ? 11 : mediumMobile ? 14 : 18;
  const endLabelFontSize = Number((endLabelBaseFontSize * 0.8).toFixed(2));
  const legendBaseFontSize = compactMobile ? 10.8 : mediumMobile ? 12.2 : 15;
  const legendFontSize = Number((legendBaseFontSize * 1.05).toFixed(2));
  const xAxisLabelScale = compactMobile ? 0.98 : 1.1;
  const xAxisLabelFontSize = Number((xAxisLabelLayout.fontSize * xAxisLabelScale).toFixed(2));
  const yAxisLabelFontSize = compactMobile ? 11 : mediumMobile ? 12 : 14;
  const seriesLineWidth = compactMobile ? 1.7 : mediumMobile ? 2.1 : 3.02;
  const chartTheme = getActiveChartThemeStyle();
  const candleBodyWidth = compactMobile ? "54%" : mediumMobile ? "58%" : "62%";
  const candleMaxWidth = compactMobile ? 10 : mediumMobile ? 12 : 16;
  const candleMinWidth = compactMobile ? 3 : 4;
  const candleUpColor = chartTheme.candleUpColor || "#2f9c72";
  const candleUpBorderColor = chartTheme.candleUpBorderColor || candleUpColor;
  const candleDownColor = chartTheme.candleDownColor || "#e15050";
  const candleDownBorderColor = chartTheme.candleDownBorderColor || candleDownColor;
  const baseTextFontSize = compactMobile ? 12 : mediumMobile ? 13 : 14;
  const legendBottom = Math.max(
    15,
    Math.round(
      gridLayout.bottom - (responsiveChartWidth <= 520 ? 50 : responsiveChartWidth <= 760 ? 58 : 66),
    ),
  );
  const chartTextMaskColor = chartTheme.textMaskColor;

  return {
    backgroundColor: chartTheme.chartBackground,
    color: rendered.map((item) => item.color),
    animationDuration: 650,
    textStyle: {
      fontFamily: CHART_FONT_FAMILY,
      fontSize: baseTextFontSize,
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
            const tuple = Array.isArray(item?.value) ? item.value : null;
            const openValue = tuple ? toFiniteNumber(tuple[0]) : null;
            const closeValue = tuple ? toFiniteNumber(tuple[1]) : null;
            const lowValue = tuple ? toFiniteNumber(tuple[2]) : null;
            const highValue = tuple ? toFiniteNumber(tuple[3]) : null;
            const singleValue = tuple ? null : toFiniteNumber(item?.value);
            let valueText = "-";
            if (
              item?.seriesType === "candlestick" &&
              isFiniteNumber(openValue) &&
              isFiniteNumber(closeValue) &&
              isFiniteNumber(lowValue) &&
              isFiniteNumber(highValue)
            ) {
              valueText = `收 ${closeValue.toFixed(1)} / 开 ${openValue.toFixed(1)} / 高 ${highValue.toFixed(1)} / 低 ${lowValue.toFixed(1)}`;
            } else if (isFiniteNumber(closeValue)) {
              valueText = closeValue.toFixed(1);
            } else if (isFiniteNumber(singleValue)) {
              valueText = singleValue.toFixed(1);
            }
            const displayName =
              legendLabelMap.get(item?.seriesName || "") ||
              item?.seriesName ||
              "-";
            return `${item?.marker || ""} ${displayName}&nbsp;&nbsp;${valueText}`;
          })
          .join("<br/>");
        return `${headText}<br/>${detail}`;
      },
      valueFormatter(value) {
        if (Array.isArray(value)) {
          const closeValue = toFiniteNumber(value[1]);
          return isFiniteNumber(closeValue) ? closeValue.toFixed(1) : "-";
        }
        return isFiniteNumber(value) ? value.toFixed(1) : "-";
      },
    },
    legend: {
      bottom: legendBottom,
      textStyle: {
        color: chartTheme.legendTextColor,
        fontSize: legendFontSize,
        fontWeight: 700,
        fontFamily: CHART_FONT_FAMILY,
      },
      itemWidth: 20,
      itemHeight: 4,
      selected: selectedMap,
      formatter(name) {
        return legendLabelMap.get(name) || name;
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
      left: gridLeft,
      right: gridRight,
      top: gridLayout.top,
      bottom: gridLayout.bottom,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: axisMonths,
      min: visibleStartIndex,
      max: visibleEndIndex,
      axisTick: {
        show: responsiveChartWidth > 760,
        alignWithLabel: true,
        interval: 0,
        length: responsiveChartWidth <= 520 ? 4 : 5,
      },
      axisLine: { lineStyle: { color: chartTheme.xAxisLineColor } },
      axisLabel: {
        color: chartTheme.xAxisLabelColor,
        interval: 0,
        margin: xAxisLabelLayout.margin,
        rotate: xAxisLabelLayout.rotate,
        fontSize: xAxisLabelFontSize,
        fontWeight: 800,
        hideOverlap: true,
        showMinLabel: true,
        showMaxLabel: true,
        fontFamily: CHART_FONT_FAMILY,
        formatter(value, index) {
          const normalizedValue = normalizeMonthToken(value);
          if (!xAxisLabelLayout.isLabelVisible(normalizedValue || value, index)) return "";
          return xAxisLabelLayout.formatLabel(normalizedValue || value);
        },
      },
    },
    yAxis: {
      type: "value",
      min: function (value) {
        return Math.floor((value.min - 5) / 10) * 10;
      },
      max: function (value) {
        return Math.ceil((value.max + 5) / 10) * 10;
      },
      axisLine: { show: true, lineStyle: { color: chartTheme.yAxisLineColor, width: 1.5 } },
      axisTick: { show: true, inside: true },
      splitLine: { show: false },
      axisLabel: {
        color: chartTheme.yAxisLabelColor,
        fontSize: yAxisLabelFontSize,
        fontWeight: 600,
        fontFamily: CHART_FONT_FAMILY,
        formatter(value) {
          return Number(value).toFixed(0);
        },
      },
    },
    series: (() => {
      const seriesList = [];
      const equityEndLabelTextColor =
        getCurrentThemeMode() === THEME_MODE_DARK ? "#f4f8fc" : "#101317";
      const equityEndLabelBackground =
        getCurrentThemeMode() === THEME_MODE_DARK ? "rgba(7, 13, 20, 0.86)" : "rgba(246, 250, 253, 0.9)";

      rendered.forEach((item) => {
        const endLabelMainText = item.endLabelMain || item.name;
        const seriesName = item.seriesName || item.id || item.name;
        const isCandlestickSeries =
          item.seriesType === "candlestick" &&
          Array.isArray(item.normalizedOhlc) &&
          item.normalizedOhlc.some((tuple) => Array.isArray(tuple));
        const isEquityAsset = item.categoryKey === "equities";
        const endLabelTextColor = isEquityAsset ? equityEndLabelTextColor : item.color;
        const endLabelBackground = isEquityAsset ? equityEndLabelBackground : chartTextMaskColor;
        const endLabelConfig = {
          show: true,
          position: "right",
          distance: compactMobile ? 4 : 6,
          offset: compactMobile ? [2, 0] : [4, 0],
          formatter() {
            return `{main|${endLabelMainText}}`;
          },
          align: "left",
          color: endLabelTextColor,
          fontFamily: CHART_FONT_FAMILY,
          fontSize: endLabelFontSize,
          backgroundColor: endLabelBackground,
          padding: [1, 5],
          rich: {
            main: {
              color: endLabelTextColor,
              fontFamily: CHART_FONT_FAMILY,
              fontWeight: 700,
              align: "left",
              fontSize: Math.max(
                compactMobile ? 8.6 : 10,
                Math.round(endLabelFontSize * (item.endLabelMainScale || 1)),
              ),
              lineHeight: Math.max(
                compactMobile ? 10 : 13,
                Math.round(endLabelFontSize * (item.endLabelMainScale || 1) * 1.08),
              ),
            },
          },
        };

        if (isCandlestickSeries) {
          seriesList.push({
            id: item.id,
            name: seriesName,
            type: "candlestick",
            triggerLineEvent: true,
            data: item.normalizedOhlc,
            barWidth: candleBodyWidth,
            barMaxWidth: candleMaxWidth,
            barMinWidth: candleMinWidth,
            itemStyle: {
              color: candleUpColor,
              color0: candleDownColor,
              borderColor: candleUpBorderColor,
              borderColor0: candleDownBorderColor,
              borderWidth: 1,
            },
            emphasis: {
              focus: "none",
              itemStyle: {
                color: candleUpColor,
                color0: candleDownColor,
                borderColor: candleUpBorderColor,
                borderColor0: candleDownBorderColor,
                borderWidth: 1.1,
              },
            },
            endLabel: {
              show: false,
            },
            animationDuration: 560,
          });

          const closeSeries = item.normalizedOhlc.map((tuple) => {
            if (!Array.isArray(tuple) || tuple.length < 2) return null;
            const closeValue = Number(tuple[1]);
            return isFiniteNumber(closeValue) ? closeValue : null;
          });

          seriesList.push({
            id: `${item.id}__endlabel`,
            name: seriesName,
            type: "line",
            triggerLineEvent: true,
            data: closeSeries,
            smooth: false,
            showSymbol: false,
            symbol: "none",
            connectNulls: false,
            silent: false,
            tooltip: {
              show: false,
            },
            lineStyle: {
              width: 1,
              opacity: 0,
            },
            itemStyle: {
              opacity: 0,
            },
            endLabel: endLabelConfig,
            labelLayout: {
              moveOverlap: "shiftY",
            },
            emphasis: {
              disabled: true,
            },
            z: 8,
            zlevel: 0,
            animation: false,
          });
          return;
        }

        seriesList.push({
          id: item.id,
          name: seriesName,
          type: "line",
          triggerLineEvent: true,
          data: item.normalized,
          smooth: 0.15,
          showSymbol: item.categoryKey === "metals",
          symbol: item.categoryKey === "metals" ? "circle" : "emptyCircle",
          symbolSize:
            item.categoryKey === "metals"
              ? compactMobile
                ? 3.6
                : mediumMobile
                  ? 4.2
                  : 5
              : 0,
          connectNulls: false,
          lineStyle: {
            width: seriesLineWidth * (item.lineWidthScale || 1),
            color: item.color,
            type: item.lineType || "solid",
            opacity:
              item.lineOpacity ??
              (item.categoryKey === "metals" ? 0.42 : 1),
          },
          itemStyle: {
            color: item.color,
            opacity: item.categoryKey === "metals" ? 0.96 : 1,
            borderColor: item.color,
            borderWidth: item.categoryKey === "metals" ? 0.6 : 0,
          },
          endLabel: endLabelConfig,
          labelLayout: {
            moveOverlap: "shiftY",
          },
          emphasis: {
            focus: "none",
          },
        });
      });

      return seriesList;
    })(),
  };
}

function render() {
  syncChartViewport();
  latestRenderContext = null;
  const selectedAssetIds = readSelectedAssetIds();
  const requestedStartMonth = startMonthEl.value;
  const requestedEndMonth = endMonthEl.value;

  if (selectedAssetIds.length === 0) {
    chart.clear();
    summaryBodyEl.innerHTML = "";
    footnoteEl.textContent = "";
    updateChartTableButton(0);
    renderChartStatsOverlay([], requestedStartMonth, requestedEndMonth);
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
    updateChartTableButton(0);
    renderChartStatsOverlay([], requestedStartMonth, requestedEndMonth);
    setStatus("时间区间无效，请确保起点不晚于终点。", true);
    return;
  }

  const startIndex = raw.dates.indexOf(requestedStartMonth);
  const endIndex = raw.dates.indexOf(requestedEndMonth);
  if (startIndex < 0 || endIndex < 0 || startIndex > endIndex) {
    updateChartTableButton(0);
    renderChartStatsOverlay([], requestedStartMonth, requestedEndMonth);
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
  syncTimeZoomWidget(months, viewportStartMonth, viewportEndMonth);

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
      missingBase.push(getAssetDisplayName(asset));
      return;
    }

    const normalized = seriesRaw.map((value) => {
      if (!isFiniteNumber(value)) return null;
      return (value / baseRaw) * 100;
    });
    const fullOhlcSeries = raw.ohlcValues?.[assetId];
    let normalizedOhlc = null;
    let seriesType = "line";
    if (asset.categoryKey === "equities" && Array.isArray(fullOhlcSeries)) {
      const windowedOhlcSeries = fullOhlcSeries.slice(startIndex, endIndex + 1);
      const mappedOhlc = windowedOhlcSeries.map((tuple) => {
        if (!Array.isArray(tuple) || tuple.length < 4) return null;
        return buildOhlcTuple(
          (Number(tuple[0]) / baseRaw) * 100,
          (Number(tuple[1]) / baseRaw) * 100,
          (Number(tuple[2]) / baseRaw) * 100,
          (Number(tuple[3]) / baseRaw) * 100,
          6,
        );
      });
      if (mappedOhlc.some((tuple) => Array.isArray(tuple))) {
        normalizedOhlc = mappedOhlc;
        seriesType = "candlestick";
      }
    }

    const viewportSeries = normalized.slice(viewportStartOffset, viewportEndOffset + 1);
    const validValues = viewportSeries.filter(isFiniteNumber);
    const peakValue = validValues.length ? Math.max(...validValues) : null;
    const peakIndex = isFiniteNumber(peakValue)
      ? viewportSeries.findIndex((value) => value === peakValue)
      : -1;
    const peakDate = peakIndex >= 0 ? viewportMonths[peakIndex] : null;
    const latestInfo = getLastFiniteInfo(viewportSeries, viewportMonths);
    const latestIndex = getLastFiniteIndex(viewportSeries);
    const momPct =
      latestIndex > 0 ? calcPctChange(latestInfo.value, viewportSeries[latestIndex - 1]) : null;
    const yoyPct =
      latestIndex >= 12 ? calcPctChange(latestInfo.value, viewportSeries[latestIndex - 12]) : null;
    const rangePct =
      isFiniteNumber(latestInfo.value) ? calcPctChange(latestInfo.value, 100) : null;
    const drawdownFromPeakPct =
      isFiniteNumber(latestInfo.value) && isFiniteNumber(peakValue)
        ? ((latestInfo.value / peakValue) - 1) * 100
        : null;
    const maxDrawdownPct = calcMaxDrawdownPct(viewportSeries);
    const cumulativePct =
      isFiniteNumber(latestInfo.value) ? calcPctChange(latestInfo.value, 100) : null;
    const annualizedPct = (() => {
      if (!isFiniteNumber(latestInfo.value) || latestIndex <= 0) return null;
      const years = latestIndex / 12;
      if (!Number.isFinite(years) || years <= 0) return null;
      return (Math.pow(latestInfo.value / 100, 1 / years) - 1) * 100;
    })();

    const displayName = getAssetDisplayName(asset);
    const seriesName = asset.id;
    rendered.push({
      id: asset.id,
      seriesName,
      name: displayName,
      categoryKey: asset.categoryKey,
      normalized,
      normalizedOhlc,
      seriesType,
      color: getAssetSeriesColor(asset, index),
    });

    summaryRows.push({
      seriesName,
      name: displayName,
      initialValue: 100,
      baseRaw,
      peakValue,
      peakDate,
      latestValue: latestInfo.value,
      latestDate: latestInfo.date,
      momPct,
      yoyPct,
      rangePct,
      drawdownFromPeakPct,
      maxDrawdownPct,
      cumulativePct,
      annualizedPct,
      sourceLabel: asset.source || "",
    });
  });

  rendered.forEach((item) => {
    item.endLabelMain = item.name;
    item.endLabelSub = "";
  });

  if (rendered.length === 0) {
    chart.clear();
    summaryBodyEl.innerHTML = "";
    footnoteEl.textContent = "";
    updateChartTableButton(0);
    renderChartStatsOverlay([], viewportStartMonth, viewportEndMonth);
    setStatus("所选资产在当前滑块起点无可用值，请调整时间区间或资产组合。", true);
    return;
  }

  const renderedNameSet = new Set(rendered.map((item) => item.seriesName || item.id));
  uiState.hiddenAssetNames = new Set(
    [...uiState.hiddenAssetNames].filter((name) => renderedNameSet.has(name)),
  );

  const visibleRows = summaryRows.filter((row) => !uiState.hiddenAssetNames.has(row.seriesName));
  updateChartTableButton(rendered.length);
  latestRenderContext = {
    startMonth: viewportStartMonth,
    endMonth: viewportEndMonth,
    visibleSummaryRows: visibleRows,
  };

  let effectiveRendered = rendered;
  const applyOptionByRendered = (renderList) => {
    isApplyingOption = true;
    try {
      chart.setOption(makeOption(renderList, months, viewportStartMonth, viewportEndMonth), {
        notMerge: true,
        lazyUpdate: false,
      });
    } finally {
      isApplyingOption = false;
    }
  };

  try {
    applyOptionByRendered(rendered);
  } catch (error) {
    const hasCandlestick = rendered.some((item) => item.seriesType === "candlestick");
    if (!hasCandlestick) {
      throw error;
    }
    const fallbackRendered = rendered.map((item) => {
      if (item.seriesType !== "candlestick") return item;
      return {
        ...item,
        seriesType: "line",
      };
    });
    applyOptionByRendered(fallbackRendered);
    effectiveRendered = fallbackRendered;
    setStatus("当前浏览器对K线渲染兼容性有限，已自动切换为折线显示。", true);
  }

  effectiveRendered.forEach((item) => {
    const key = item.seriesName || item.id || item.name;
    if (uiState.hiddenAssetNames.has(key)) {
      chart.dispatchAction({ type: "legendUnSelect", name: key });
    }
  });

  chartTitleEl.textContent = "多资产价格走势对比";
  chartMetaEl.textContent = `${formatMonthZh(viewportStartMonth)} - ${formatMonthZh(viewportEndMonth)} | 定基 ${formatMonthZh(viewportStartMonth)} = 100`;

  renderSummaryTable(visibleRows);
  renderChartStatsOverlay(visibleRows, viewportStartMonth, viewportEndMonth);

  const activeSources = new Set();
  selectedAssetIds.forEach((id) => {
    const asset = assetById.get(id);
    if (asset?.source) activeSources.add(asset.source);
  });
  const sourceText = summarizeSourceProviders([...activeSources], { maxItems: 4, fallback: "-" });
  footnoteEl.textContent = `当前滑块区间：${viewportStartMonth} ~ ${viewportEndMonth}；数据源：${sourceText || "-"}。`;

  const missingText = missingBase.length ? `未纳入：${missingBase.join("、")}。` : "";
  if (!statusEl.textContent.includes("已自动切换为折线显示")) {
    setStatus(`已生成 ${rendered.length} 条走势（定基 ${viewportStartMonth}=100）。${missingText}`, false);
  }
}

function bindEvents() {
  themeModeEl.addEventListener("change", () => {
    applyThemeMode(themeModeEl.value, { persist: true, rerender: true });
  });

  renderBtn.addEventListener("click", () => {
    uiState.hiddenAssetNames.clear();
    safeRender("生成图表");
  });

  if (chartTableBtn) {
    chartTableBtn.addEventListener("click", () => {
      if (chartTableBtn.disabled) return;
      uiState.showChartTable = !uiState.showChartTable;
      safeRender("切换图内表格");
    });
  }

  assetListEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const chip = target.closest(".china-source-chip");
    if (!chip) return;
    const nextMode = chip.dataset.cnSourceMode || CHINA_SOURCE_MODE_CONFIG[0].key;
    applyChinaSourceMode(nextMode, { announce: true });
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
    syncAssetSelectionCapacityUi();
    setStatus(`已选择前 ${MAX_SELECTED_ASSET_COUNT} 个可见资产。`, false);
  });

  clearAllBtn.addEventListener("click", () => {
    assetListEl.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
    syncAssetSelectionCapacityUi();
  });

  assetSearchEl.addEventListener("input", () => {
    applyAssetSearchFilter();
  });

  startMonthEl.addEventListener("change", () => {
    if (startMonthEl.value > endMonthEl.value) {
      endMonthEl.value = startMonthEl.value;
    }
    syncTimeZoomWidgetFromMonthSelects();
  });

  endMonthEl.addEventListener("change", () => {
    if (endMonthEl.value < startMonthEl.value) {
      startMonthEl.value = endMonthEl.value;
    }
    syncTimeZoomWidgetFromMonthSelects();
  });

  chart.on("legendselectchanged", (params) => {
    if (isApplyingOption) return;
    const hidden = new Set();
    Object.entries(params.selected || {}).forEach(([name, selected]) => {
      if (!selected) hidden.add(name);
    });
    uiState.hiddenAssetNames = hidden;
    safeRender("图例筛选");
  });

  chart.on("click", (params) => {
    if (params?.componentType === "series" && params?.seriesName) {
      if (uiState.hiddenAssetNames.has(params.seriesName)) {
        uiState.hiddenAssetNames.delete(params.seriesName);
      } else {
        uiState.hiddenAssetNames.add(params.seriesName);
      }
      safeRender("点击系列切换");
    }
  });

  if (timeZoomStartEl && timeZoomEndEl) {
    timeZoomStartEl.addEventListener("input", () => {
      applyTimeZoomFromInputs("start");
    });
    timeZoomEndEl.addEventListener("input", () => {
      applyTimeZoomFromInputs("end");
    });
    timeZoomStartEl.addEventListener("change", () => {
      applyTimeZoomFromInputs("start");
    });
    timeZoomEndEl.addEventListener("change", () => {
      applyTimeZoomFromInputs("end");
    });
  }

  window.addEventListener("resize", () => {
    syncUsHousingGridViewportHeight();
    syncChartViewport();
    safeRender("窗口尺寸变化");
  });
}

async function init() {
  applyThemeMode(readStoredThemeMode(), { persist: false, rerender: false });

  setStatus("正在加载多资产数据（中国房产/Case-Shiller/贵金属/权益类资产）...", false);
  let dataset;
  const localData = window.MULTI_ASSET_SOURCE_DATA;
  if (isUsableMultiAssetDataset(localData)) {
    dataset = normalizeMultiAssetDataset(localData);
  } else {
    try {
      dataset = await buildMultiAssetDataset();
      dataset = normalizeMultiAssetDataset(dataset);
    } catch (error) {
      setStatus("多资产数据加载失败，请检查网络后刷新重试。", true);
      return;
    }
  }

  raw = dataset;
  buildAssetControls(raw.assets);
  buildMonthSelects(raw.dates);
  applyChinaSourceMode(uiState.chinaSourceMode, { announce: false });
  bindEvents();
  if (!safeRender("初始化图表")) {
    return;
  }

  if (Array.isArray(dataset.warnings) && dataset.warnings.length > 0) {
    setStatus(`已加载核心数据，部分资产源暂不可用：${dataset.warnings.slice(0, 3).join(" ")}`, true);
  }
}

init();
