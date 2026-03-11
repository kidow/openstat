"use client";

import {
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
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

export interface RadialChartProps<TData extends Record<string, string | number>>
  extends React.ComponentProps<"div"> {
  config: ChartConfig;
  data: TData[];
  dataKey: string;
  endAngle?: number;
  height?: number;
  innerRadius?: string | number;
  nameKey: string;
  outerRadius?: string | number;
  startAngle?: number;
}

export function RadialChart<TData extends Record<string, string | number>>({
  className,
  config,
  data,
  dataKey,
  endAngle = -270,
  height = 240,
  innerRadius = "45%",
  nameKey,
  outerRadius = "85%",
  startAngle = 90,
  ...props
}: RadialChartProps<TData>) {
  return (
    <ChartContainer className={cn("w-full", className)} config={config} {...props}>
      <div style={{ height }}>
        <ResponsiveContainer minHeight={height} minWidth={0} width="100%" height="100%">
          <RechartsRadialBarChart
            data={data}
            endAngle={endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
          >
            <ChartTooltip
              content={<ChartTooltipContent labelKey={nameKey} nameKey={nameKey} />}
              cursor={false}
            />
            <PolarAngleAxis dataKey={dataKey} domain={[0, 100]} tick={false} type="number" />
            <RadialBar background cornerRadius={0} dataKey={dataKey}>
              {data.map((entry, index) => (
                <Cell
                  fill={chartColorVar(String(entry[nameKey]))}
                  key={`${String(entry[nameKey])}-${index}`}
                />
              ))}
            </RadialBar>
          </RechartsRadialBarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
