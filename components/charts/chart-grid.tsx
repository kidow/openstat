import { ChartCard } from '@/components/charts/chart-card';
import { chartRegistry } from '@/lib/charts/registry';

export function ChartGrid() {
  return (
    <section className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {chartRegistry.map((chart) => (
        <ChartCard
          key={chart.id}
          title={chart.title}
          description={chart.description}
        />
      ))}
    </section>
  );
}
