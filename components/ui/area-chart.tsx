"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
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

export function AreaChart<TData extends Record<string, string | number>>({
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
          <RechartsAreaChart data={data} margin={{ left: 12, right: 12, top: 8, bottom: 0 }}>
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
            <ChartTooltip
              content={<ChartTooltipContent formatter={valueFormatter} indicator="line" />}
              cursor={false}
            />
            {series.map((item) => {
              const color = item.color ?? chartColorVar(item.dataKey);

              return (
                <Area
                  dataKey={item.dataKey}
                  fill={color}
                  fillOpacity={item.fillOpacity ?? 0.24}
                  key={item.dataKey}
                  stackId={item.stackId}
                  stroke={color}
                  strokeWidth={item.strokeWidth ?? 2}
                  type="natural"
                />
              );
            })}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
