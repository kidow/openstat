"use client";

import { BarChart } from "@/components/ui/bar-chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { PopulationBarDatum } from "@/lib/charts/kosis-population-parser";

const barConfig = {
  value: { label: "Total Population", color: "#0f766e" },
} satisfies ChartConfig;

interface PopulationBarChartClientProps {
  data: PopulationBarDatum[];
}

export function PopulationBarChartClient({ data }: PopulationBarChartClientProps) {
  const minChartWidth = Math.max(data.length * 36, 720);

  return (
    <div className="overflow-x-auto pb-2">
      <BarChart
        className="min-w-0"
        config={barConfig}
        data={data}
        height={180}
        series={[{ dataKey: "value" }]}
        showYAxis
        style={{ minWidth: minChartWidth }}
        valueFormatter={(value) =>
          typeof value === "number" ? value.toLocaleString("ko-KR") : String(value ?? "")
        }
        xKey="label"
      />
    </div>
  );
}
