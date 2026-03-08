"use client";

import { AreaChart } from "@/components/ui/area-chart";
import { BarChart } from "@/components/ui/bar-chart";
import { LineChart } from "@/components/ui/line-chart";
import { PieChart } from "@/components/ui/pie-chart";
import { RadarChart } from "@/components/ui/radar-chart";
import { RadialChart } from "@/components/ui/radial-chart";
import type { ChartConfig } from "@/components/ui/chart";

const monthlyData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 120 },
  { month: "March", desktop: 237, mobile: 160 },
  { month: "April", desktop: 173, mobile: 140 },
  { month: "May", desktop: 209, mobile: 180 },
  { month: "June", desktop: 214, mobile: 190 },
];

const categoricalData = [
  { label: "Real Estate", value: 42 },
  { label: "Stocks", value: 28 },
  { label: "Economy", value: 18 },
  { label: "Population", value: 12 },
];

const radarData = [
  { subject: "Stability", score: 82 },
  { subject: "Growth", score: 68 },
  { subject: "Coverage", score: 91 },
  { subject: "Latency", score: 74 },
  { subject: "Accuracy", score: 88 },
];

const radialData = [{ name: "completion", value: 72 }];

const areaConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#93c5fd" },
} satisfies ChartConfig;

const barConfig = {
  value: { label: "Volume", color: "#0f766e" },
} satisfies ChartConfig;

const lineConfig = {
  desktop: { label: "Index", color: "#7c3aed" },
} satisfies ChartConfig;

const pieConfig = {
  "Real Estate": { label: "Real Estate", color: "#2563eb" },
  Stocks: { label: "Stocks", color: "#16a34a" },
  Economy: { label: "Economy", color: "#ea580c" },
  Population: { label: "Population", color: "#7c3aed" },
} satisfies ChartConfig;

const radarConfig = {
  score: { label: "Score", color: "#dc2626" },
} satisfies ChartConfig;

const radialConfig = {
  completion: { label: "Completion", color: "#0f766e" },
} satisfies ChartConfig;

interface ChartPreviewProps {
  chartId: string;
}

export function ChartPreview({ chartId }: ChartPreviewProps) {
  switch (chartId) {
    case "area-population":
      return (
        <AreaChart
          config={areaConfig}
          data={monthlyData}
          height={180}
          series={[
            { dataKey: "desktop", fillOpacity: 0.2 },
            { dataKey: "mobile", fillOpacity: 0.12 },
          ]}
          xKey="month"
          xTickFormatter={(value) => String(value).slice(0, 3)}
        />
      );
    case "bar-economy":
      return (
        <BarChart
          config={barConfig}
          data={categoricalData}
          height={180}
          series={[{ dataKey: "value" }]}
          xKey="label"
          xTickFormatter={(value) => String(value).slice(0, 4)}
        />
      );
    case "line-stock":
      return (
        <LineChart
          config={lineConfig}
          data={monthlyData}
          height={180}
          series={[{ dataKey: "desktop" }]}
          xKey="month"
          xTickFormatter={(value) => String(value).slice(0, 3)}
        />
      );
    case "pie-share":
      return (
        <PieChart
          config={pieConfig}
          data={categoricalData}
          dataKey="value"
          height={180}
          nameKey="label"
        />
      );
    case "radar-score":
      return (
        <RadarChart
          angleKey="subject"
          config={radarConfig}
          data={radarData}
          dataKey="score"
          height={180}
        />
      );
    case "radial-progress":
      return (
        <RadialChart
          config={radialConfig}
          data={radialData}
          dataKey="value"
          height={180}
          nameKey="name"
        />
      );
    default:
      return (
        <AreaChart
          config={areaConfig}
          data={monthlyData}
          height={180}
          series={[{ dataKey: "desktop", fillOpacity: 0.2 }]}
          xKey="month"
          xTickFormatter={(value) => String(value).slice(0, 3)}
        />
      );
  }
}
