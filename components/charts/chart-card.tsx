"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

interface ChartCardProps {
  title: string;
  description: string;
}

export function ChartCard({ title, description }: ChartCardProps) {
  return (
    <article className="bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#e4e4e7" />
            <XAxis
              axisLine={false}
              dataKey="month"
              minTickGap={24}
              tick={{ fill: "#71717a", fontSize: 12 }}
              tickLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
              tickMargin={8}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                border: "1px solid #e4e4e7",
                borderRadius: "0px",
                boxShadow: "none",
              }}
              formatter={(value: number) => [`${value}`, "Desktop"]}
              labelFormatter={(label) => `${label}`}
            />
            <Area
              dataKey="desktop"
              fill="#dbeafe"
              fillOpacity={0.9}
              stroke="#2563eb"
              strokeWidth={2}
              type="natural"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-start gap-2 text-sm">
        <div className="grid gap-1">
          <div className="leading-none font-medium text-zinc-900">
            Trending up by 5.2% this month
          </div>
          <div className="leading-none text-zinc-500">January - June 2024</div>
        </div>
      </div>
    </article>
  );
}
