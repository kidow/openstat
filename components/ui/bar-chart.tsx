"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  chartColorVar,
  type CartesianChartProps,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export function BarChart<TData extends Record<string, string | number>>({
  className,
  config,
  data,
  height = 240,
  series,
  showGrid = true,
  showYAxis = false,
  valueFormatter,
  xKey,
  xTickFormatter,
  yAxisWidth = 32,
  ...props
}: CartesianChartProps<TData>) {
  return (
    <ChartContainer className={cn("w-full", className)} config={config} {...props}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ left: 12, right: 12, top: 8, bottom: 0 }}>
            {showGrid ? <CartesianGrid vertical={false} /> : null}
            <XAxis
              axisLine={false}
              dataKey={xKey}
              minTickGap={24}
              tickLine={false}
              tickMargin={8}
              tickFormatter={xTickFormatter}
            />
            {showYAxis ? <YAxis axisLine={false} tickLine={false} width={yAxisWidth} /> : null}
            <ChartTooltip content={<ChartTooltipContent formatter={valueFormatter} />} cursor={false} />
            {series.map((item) => (
              <Bar
                dataKey={item.dataKey}
                fill={item.color ?? chartColorVar(item.dataKey)}
                key={item.dataKey}
                radius={0}
                stackId={item.stackId}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
