"use client";

import * as React from "react";
import {
  Tooltip as RechartsTooltip,
  type TooltipPayloadEntry,
  type TooltipValueType,
} from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    color?: string;
    label?: React.ReactNode;
  }
>;

export interface ChartSeriesDefinition {
  color?: string;
  dataKey: string;
  fillOpacity?: number;
  label?: string;
  stackId?: string;
  strokeWidth?: number;
}

export interface CartesianChartProps<
  TData extends Record<string, string | number>,
> extends React.ComponentProps<"div"> {
  config: ChartConfig;
  data: TData[];
  height?: number;
  series: ChartSeriesDefinition[];
  showGrid?: boolean;
  showYAxis?: boolean;
  valueFormatter?: (
    value: TooltipValueType | undefined,
    name: string,
    item: TooltipPayloadEntry,
    index: number,
    payload: TooltipPayloadEntry[],
  ) => React.ReactNode;
  xKey: string;
  xTickFormatter?: (value: string | number) => string;
  yAxisWidth?: number;
}

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("Chart components must be used inside ChartContainer.");
  }

  return context;
}

function sanitizeConfigKey(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function getConfigForPayload(
  config: ChartConfig,
  item: TooltipPayloadEntry,
  key?: string,
) {
  const payload = item.payload;

  if (key && payload && typeof payload === "object" && key in payload) {
    return config[String(payload[key])];
  }

  if (typeof item.dataKey === "string") {
    return config[item.dataKey];
  }

  if (typeof item.name === "string") {
    return config[item.name];
  }

  return undefined;
}

function ChartStyle({
  chartId,
  config,
}: {
  chartId: string;
  config: ChartConfig;
}) {
  const colorEntries = Object.entries(config).filter(([, value]) => value.color);

  if (!colorEntries.length) {
    return null;
  }

  const css = colorEntries
    .map(
      ([key, value]) =>
        `--color-${sanitizeConfigKey(key)}: ${value.color};`,
    )
    .join("\n");

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `[data-chart="${chartId}"] { ${css} }`,
      }}
    />
  );
}

export interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
}

export function chartColorVar(key: string) {
  return `var(--color-${sanitizeConfigKey(key)})`;
}

export function ChartContainer({
  children,
  className,
  config,
  id,
  ...props
}: ChartContainerProps) {
  const reactId = React.useId();
  const chartId = React.useMemo(
    () => id ?? `chart-${reactId.replace(/:/g, "")}`,
    [id, reactId],
  );

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "h-full w-full text-xs [&_.recharts-cartesian-axis-tick_text]:fill-zinc-500 [&_.recharts-cartesian-grid_line]:stroke-zinc-200 [&_.recharts-layer]:outline-none [&_.recharts-polar-grid-concentric-circle]:stroke-zinc-200 [&_.recharts-polar-grid-angle-line]:stroke-zinc-200",
          className,
        )}
        data-chart={chartId}
        {...props}
      >
        <ChartStyle chartId={chartId} config={config} />
        {children}
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = RechartsTooltip;

export interface ChartTooltipContentProps
  extends React.ComponentProps<"div"> {
  active?: boolean;
  formatter?: (
    value: TooltipValueType | undefined,
    name: string,
    item: TooltipPayloadEntry,
    index: number,
    payload: TooltipPayloadEntry[],
  ) => React.ReactNode;
  hideIndicator?: boolean;
  hideLabel?: boolean;
  indicator?: "dot" | "line";
  label?: React.ReactNode;
  labelFormatter?: (
    label: React.ReactNode,
    payload: TooltipPayloadEntry[],
  ) => React.ReactNode;
  labelKey?: string;
  nameKey?: string;
  payload?: TooltipPayloadEntry[];
}

export function ChartTooltipContent({
  active,
  className,
  formatter,
  hideIndicator = false,
  hideLabel = false,
  indicator = "dot",
  label,
  labelFormatter,
  labelKey,
  nameKey,
  payload,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  const tooltipLabel = !hideLabel
    ? labelFormatter?.(label, payload) ??
      getConfigForPayload(config, payload[0], labelKey)?.label ??
      label
    : null;

  return (
    <div
      className={cn(
        "grid min-w-[10rem] gap-2 border border-zinc-200 bg-white px-3 py-2 text-xs shadow-sm",
        className,
      )}
    >
      {tooltipLabel ? (
        <div className="font-medium text-zinc-900">{tooltipLabel}</div>
      ) : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const itemConfig = getConfigForPayload(config, item, nameKey);
          const itemLabel = itemConfig?.label ?? String(item.name ?? item.dataKey ?? "Value");
          const formatterLabel =
            typeof itemConfig?.label === "string"
              ? itemConfig.label
              : String(item.name ?? item.dataKey ?? "Value");
          const itemColor =
            item.color ??
            (typeof item.dataKey === "string"
              ? chartColorVar(item.dataKey)
              : "#18181b");
          const formatted = formatter?.(
            item.value,
            formatterLabel,
            item,
            index,
            payload,
          );

          return (
            <div
              className="flex items-center justify-between gap-4 text-zinc-700"
              key={`${String(item.dataKey)}-${String(item.name)}-${index}`}
            >
              <div className="flex items-center gap-2">
                {hideIndicator ? null : indicator === "line" ? (
                  <span
                    className="h-0.5 w-3 shrink-0"
                    style={{ backgroundColor: itemColor }}
                  />
                ) : (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: itemColor }}
                  />
                )}
                <span>{itemLabel}</span>
              </div>
              <div className="font-medium text-zinc-950">
                {formatted ?? String(item.value ?? "")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
