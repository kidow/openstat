import { ChartPreview } from "@/components/charts/chart-preview";
import { KosisPopulationBarChart } from "@/components/charts/kosis-population-bar-chart";
import { KOSIS_POPULATION_BAR_CHART_ID } from "@/lib/charts/kosis-population";

interface ChartCardProps {
  id: string;
  title: string;
  description: string;
}

export function ChartCard({ id, title, description }: ChartCardProps) {
  return (
    <article className="bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
      <div className="mt-4">
        {id === KOSIS_POPULATION_BAR_CHART_ID ? (
          <KosisPopulationBarChart />
        ) : (
          <ChartPreview chartId={id} />
        )}
      </div>
    </article>
  );
}
