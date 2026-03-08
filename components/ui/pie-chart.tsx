"use client";

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  chartColorVar,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export interface PieChartProps<TData extends Record<string, string | number>>
  extends React.ComponentProps<"div"> {
  config: ChartConfig;
  data: TData[];
  dataKey: string;
  height?: number;
  innerRadius?: number;
  nameKey: string;
  outerRadius?: number;
  showLabel?: boolean;
}

export function PieChart<TData extends Record<string, string | number>>({
  className,
  config,
  data,
  dataKey,
  height = 240,
  innerRadius = 56,
  nameKey,
  outerRadius = 84,
  showLabel = false,
  ...props
}: PieChartProps<TData>) {
  return (
    <ChartContainer className={cn("w-full", className)} config={config} {...props}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <ChartTooltip
              content={<ChartTooltipContent labelKey={nameKey} nameKey={nameKey} />}
              cursor={false}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              innerRadius={innerRadius}
              label={showLabel}
              nameKey={nameKey}
              outerRadius={outerRadius}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  fill={chartColorVar(String(entry[nameKey]))}
                  key={`${String(entry[nameKey])}-${index}`}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
