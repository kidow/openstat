import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { parseKosisPopulationRows } from '../lib/charts/kosis-population-parser.ts';

const KOSIS_POPULATION_BAR_CHART_ID = 'bar-population-total';

test('parseKosisPopulationRows normalizes KOSIS rows into ascending bar-chart data', () => {
  const parsed = parseKosisPopulationRows([
    { PRD_DE: '2024', DT: '51,217,221' },
    { PRD_DE: '2022', DT: '51,439,038' },
    { PRD_DE: '2023', DT: '51,325,329' },
  ]);

  assert.deepEqual(parsed, [
    { label: '2022', value: 51439038 },
    { label: '2023', value: 51325329 },
    { label: '2024', value: 51217221 },
  ]);
});

test('the first chart card is wired to the KOSIS-backed population bar chart', () => {
  const registrySource = readFileSync(
    new URL('../lib/charts/registry.ts', import.meta.url),
    'utf8',
  );
  const cardSource = readFileSync(
    new URL('../components/charts/chart-card.tsx', import.meta.url),
    'utf8',
  );

  assert.match(
    registrySource,
    /chartRegistry:\s*ChartDefinition\[\]\s*=\s*\[\s*KOSIS_POPULATION_BAR_CHART/s,
    'Expected the first chart registry entry to point at the KOSIS population bar chart.',
  );

  assert.match(
    cardSource,
    /id === KOSIS_POPULATION_BAR_CHART_ID[\s\S]*KosisPopulationBarChart/,
    'Expected ChartCard to branch to the KOSIS population bar chart component.',
  );
});
