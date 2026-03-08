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
  return (
    <BarChart
      config={barConfig}
      data={data}
      height={180}
      series={[{ dataKey: "value" }]}
      showYAxis
      valueFormatter={(value) =>
        typeof value === "number" ? value.toLocaleString("ko-KR") : String(value ?? "")
      }
      xKey="label"
    />
  );
}
