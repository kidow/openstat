import type { ChartDefinition } from '@/lib/types/chart';

export const chartRegistry: ChartDefinition[] = [
  {
    id: 'area-population',
    title: '인구 추이 (Area)',
    description: '월 단위 인구 변화를 면적 차트로 표시합니다.',
    dataTag: 'gov-population-monthly',
    revalidateSeconds: 60 * 60 * 24,
  },
  {
    id: 'bar-economy',
    title: '경제 지표 (Bar)',
    description: '주요 경제 지표를 막대 차트로 비교합니다.',
    dataTag: 'gov-economy-weekly',
    revalidateSeconds: 60 * 30,
  },
  {
    id: 'line-stock',
    title: '시장 추세 (Line)',
    description: '주요 지표의 추세를 선형 차트로 시각화합니다.',
    dataTag: 'gov-market-daily',
    revalidateSeconds: 60 * 10,
  },
];
