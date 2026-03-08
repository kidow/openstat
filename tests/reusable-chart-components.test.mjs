import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const componentExpectations = [
  ['../components/ui/chart.tsx', ['ChartContainer', 'ChartTooltip', 'ChartTooltipContent']],
  ['../components/ui/area-chart.tsx', ['export function AreaChart']],
  ['../components/ui/bar-chart.tsx', ['export function BarChart']],
  ['../components/ui/line-chart.tsx', ['export function LineChart']],
  ['../components/ui/pie-chart.tsx', ['export function PieChart']],
  ['../components/ui/radar-chart.tsx', ['export function RadarChart']],
  ['../components/ui/radial-chart.tsx', ['export function RadialChart']],
  ['../components/charts/chart-preview.tsx', ['export function ChartPreview']],
];

test('reusable chart component files exist with their expected exports', () => {
  for (const [file, exports] of componentExpectations) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');

    for (const expectedExport of exports) {
      assert.ok(
        source.includes(expectedExport),
        `Expected ${file} to include ${expectedExport}.`,
      );
    }
  }
});

test('chart container removes outlines from recharts surfaces', () => {
  const source = readFileSync(
    new URL('../components/ui/chart.tsx', import.meta.url),
    'utf8',
  );

  assert.ok(
    source.includes('[&_.recharts-surface]:outline-none'),
    'Expected chart container to remove outlines from svg.recharts-surface.',
  );
});
