import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  buildKosisPopulationUrl,
  getKosisPopulationBarChartData,
} from '../lib/charts/kosis-population.ts';
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

test('buildKosisPopulationUrl requests yearly total population data across the supported year range', () => {
  const url = new URL(buildKosisPopulationUrl('test-api-key'));

  assert.equal(url.origin, 'https://kosis.kr');
  assert.equal(url.pathname, '/openapi/statisticsData.do');
  assert.equal(url.searchParams.get('method'), 'getList');
  assert.equal(url.searchParams.get('format'), 'json');
  assert.equal(url.searchParams.get('jsonVD'), 'Y');
  assert.equal(
    url.searchParams.get('userStatsId'),
    'openapisample/101/DT_1IN1502/2/1/20191106094026_1',
  );
  assert.equal(url.searchParams.get('prdSe'), 'Y');
  assert.equal(url.searchParams.get('prdInterval'), '1');
  assert.equal(url.searchParams.get('startPrdDe'), '1960');
  assert.equal(url.searchParams.get('endPrdDe'), String(new Date().getFullYear()));
  assert.equal(url.searchParams.has('newEstPrdCnt'), false);
});

test('getKosisPopulationBarChartData fetches and normalizes yearly population rows for the bar chart', async (t) => {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env.KOSIS_API_KEY;

  process.env.KOSIS_API_KEY = 'test-api-key';
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));

    assert.equal(url.searchParams.get('startPrdDe'), '1960');
    assert.equal(url.searchParams.get('endPrdDe'), String(new Date().getFullYear()));
    assert.equal(url.searchParams.get('newEstPrdCnt'), null);
    assert.equal(init?.next?.revalidate, 60 * 60 * 24);
    assert.deepEqual(init?.next?.tags, ['gov-population-total-yearly', 'chart:bar-population-total']);

    return new Response(
      JSON.stringify([
        { PRD_DE: '2024', DT: '51,217,221' },
        { PRD_DE: '2022', DT: '51,439,038' },
        { PRD_DE: '2023', DT: '51,325,329' },
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  };

  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalApiKey === undefined) {
      delete process.env.KOSIS_API_KEY;
    } else {
      process.env.KOSIS_API_KEY = originalApiKey;
    }
  });

  const data = await getKosisPopulationBarChartData();

  assert.deepEqual(data, [
    { label: '2022', value: 51439038 },
    { label: '2023', value: 51325329 },
    { label: '2024', value: 51217221 },
  ]);
});

test('getKosisPopulationBarChartData logs fetch failures and returns an empty dataset', async (t) => {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env.KOSIS_API_KEY;
  const originalConsoleError = console.error;
  const logged = [];

  process.env.KOSIS_API_KEY = 'test-api-key';
  globalThis.fetch = async () => {
    throw new Error('socket hang up');
  };
  console.error = (...args) => {
    logged.push(args);
  };

  t.after(() => {
    globalThis.fetch = originalFetch;
    console.error = originalConsoleError;
    if (originalApiKey === undefined) {
      delete process.env.KOSIS_API_KEY;
    } else {
      process.env.KOSIS_API_KEY = originalApiKey;
    }
  });

  const data = await getKosisPopulationBarChartData();

  assert.deepEqual(data, []);
  assert.equal(logged.length, 1);
  assert.equal(logged[0][0], '[KOSIS population] request failed');
  assert.equal(logged[0][1]?.message, 'socket hang up');
});
