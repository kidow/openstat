"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  chartColorVar,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export interface RadarChartProps<TData extends Record<string, string | number>>
  extends React.ComponentProps<"div"> {
  angleKey: string;
  config: ChartConfig;
  data: TData[];
  dataKey: string;
  height?: number;
}

export function RadarChart<TData extends Record<string, string | number>>({
  angleKey,
  className,
  config,
  data,
  dataKey,
  height = 240,
  ...props
}: RadarChartProps<TData>) {
  return (
    <ChartContainer className={cn("w-full", className)} config={config} {...props}>
      <div style={{ height }}>
        <ResponsiveContainer minHeight={height} minWidth={0} width="100%" height="100%">
          <RechartsRadarChart data={data}>
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <PolarGrid />
            <PolarAngleAxis dataKey={angleKey} />
            <Radar
              dataKey={dataKey}
              fill={chartColorVar(String(dataKey))}
              fillOpacity={0.25}
              stroke={chartColorVar(String(dataKey))}
              strokeWidth={2}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
