import type { ChartDefinition } from "@/lib/types/chart";

import { KOSIS_POPULATION_BAR_CHART } from "./kosis-population";

export const chartRegistry: ChartDefinition[] = [
  KOSIS_POPULATION_BAR_CHART,
  {
    id: "area-population",
    title: "인구 추이 (Area)",
    description: "월 단위 인구 변화를 면적 차트로 표시합니다.",
    dataTag: "gov-population-monthly",
    revalidateSeconds: 60 * 60 * 24,
  },
  {
    id: "bar-economy",
    title: "경제 지표 (Bar)",
    description: "주요 경제 지표를 막대 차트로 비교합니다.",
    dataTag: "gov-economy-weekly",
    revalidateSeconds: 60 * 30,
  },
  {
    id: "line-stock",
    title: "시장 추세 (Line)",
    description: "주요 지표의 추세를 선형 차트로 시각화합니다.",
    dataTag: "gov-market-daily",
    revalidateSeconds: 60 * 10,
  },
  {
    id: "pie-share",
    title: "카테고리 비중 (Pie)",
    description: "도메인별 비중을 원형 차트로 비교합니다.",
    dataTag: "gov-category-monthly",
    revalidateSeconds: 60 * 60 * 24,
  },
  {
    id: "radar-score",
    title: "지표 밸런스 (Radar)",
    description: "핵심 품질 지표를 레이더 차트로 비교합니다.",
    dataTag: "gov-quality-weekly",
    revalidateSeconds: 60 * 60,
  },
  {
    id: "radial-progress",
    title: "수집 진행도 (Radial)",
    description: "데이터 적재 진행률을 방사형 차트로 표시합니다.",
    dataTag: "gov-pipeline-hourly",
    revalidateSeconds: 60 * 15,
  },
];
