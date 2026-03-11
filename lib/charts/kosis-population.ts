import type { ChartDefinition } from "../types/chart";

import { buildChartFetchOptions } from "./cache/policy";
import {
  parseKosisPopulationRows,
  type KosisPopulationRow,
} from "./kosis-population-parser";

export const KOSIS_POPULATION_BAR_CHART: ChartDefinition = {
  id: "bar-population-total",
  title: "총인구 추이 (Bar)",
  description: "연도별 총인구 수를 막대 차트로 표시합니다.",
  dataTag: "gov-population-total-yearly",
  revalidateSeconds: 60 * 60 * 24,
};

export const KOSIS_POPULATION_BAR_CHART_ID = KOSIS_POPULATION_BAR_CHART.id;

const KOSIS_POPULATION_START_YEAR = "1960";

function getSanitizedKosisPopulationUrl() {
  return buildKosisPopulationUrl("REDACTED").replace("apiKey=REDACTED", "apiKey=[redacted]");
}

export function buildKosisPopulationUrl(apiKey: string) {
  const url = new URL("https://kosis.kr/openapi/statisticsData.do");

  url.search = new URLSearchParams({
    method: "getList",
    apiKey,
    format: "json",
    jsonVD: "Y",
    userStatsId: "openapisample/101/DT_1IN1502/2/1/20191106094026_1",
    prdSe: "Y",
    startPrdDe: KOSIS_POPULATION_START_YEAR,
    endPrdDe: String(new Date().getFullYear()),
    prdInterval: "1",
  }).toString();

  return url.toString();
}

export async function getKosisPopulationBarChartData() {
  const apiKey = process.env.KOSIS_API_KEY;

  if (!apiKey) {
    console.warn("[KOSIS population] missing KOSIS_API_KEY");
    return [];
  }

  try {
    const response = await fetch(
      buildKosisPopulationUrl(apiKey),
      buildChartFetchOptions(KOSIS_POPULATION_BAR_CHART),
    );

    if (!response.ok) {
      console.error("[KOSIS population] request failed", {
        status: response.status,
        statusText: response.statusText,
        url: getSanitizedKosisPopulationUrl(),
      });
      return [];
    }

    const payload: unknown = await response.json();

    if (!Array.isArray(payload)) {
      console.error("[KOSIS population] unexpected payload", {
        payload,
        url: getSanitizedKosisPopulationUrl(),
      });
      return [];
    }

    return parseKosisPopulationRows(payload as KosisPopulationRow[]);
  } catch (error) {
    console.error("[KOSIS population] request failed", error);
    return [];
  }
}
