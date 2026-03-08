import { ChartCard } from "@/components/charts/chart-card";
import { chartRegistry } from "@/lib/charts/registry";

export function ChartGrid() {
  return (
    <section className="grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 xl:grid-cols-3">
      {chartRegistry.map((chart) => (
        <ChartCard
          id={chart.id}
          key={chart.id}
          title={chart.title}
          description={chart.description}
        />
      ))}
    </section>
  );
}
