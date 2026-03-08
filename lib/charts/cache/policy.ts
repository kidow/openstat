import type { ChartDefinition } from '@/lib/types/chart';

export function buildChartFetchOptions(chart: ChartDefinition) {
  return {
    next: {
      revalidate: chart.revalidateSeconds,
      tags: [chart.dataTag, `chart:${chart.id}`],
    },
  };
}
