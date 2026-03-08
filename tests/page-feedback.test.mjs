import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('chart grid removes the layout gap on the home page', () => {
  const source = readFileSync(
    new URL('../components/charts/chart-grid.tsx', import.meta.url),
    'utf8',
  );

  assert.ok(
    !source.includes('gap-4'),
    'Expected home page chart grid to remove the gap utility class.',
  );

  assert.ok(
    !source.includes('p-4'),
    'Expected home page chart grid to remove the padding utility class.',
  );
});

test('chart cards remove rounded corners on the home page', () => {
  const source = readFileSync(
    new URL('../components/charts/chart-card.tsx', import.meta.url),
    'utf8',
  );

  assert.ok(
    !source.includes('rounded-lg'),
    'Expected chart cards to remove rounded-lg from the outer card.',
  );

  assert.ok(
    !source.includes('className="border'),
    'Expected chart cards to stop drawing overlapping borders individually.',
  );
});

test('chart cards render a basic area chart instead of a gray placeholder', () => {
  const source = readFileSync(
    new URL('../components/charts/chart-card.tsx', import.meta.url),
    'utf8',
  );

  assert.ok(
    source.includes('AreaChart'),
    'Expected chart card to render an AreaChart.',
  );

  assert.ok(
    source.includes('ResponsiveContainer'),
    'Expected chart card to size the chart responsively.',
  );

  assert.ok(
    !source.includes('h-40 rounded-md bg-zinc-100'),
    'Expected the gray placeholder block to be removed.',
  );
});

test('dark mode is disabled for the current UI', () => {
  const cardSource = readFileSync(
    new URL('../components/charts/chart-card.tsx', import.meta.url),
    'utf8',
  );
  const globalSource = readFileSync(
    new URL('../app/globals.css', import.meta.url),
    'utf8',
  );

  assert.ok(
    !cardSource.includes('dark:'),
    'Expected chart card styles to stop using dark mode utility classes.',
  );

  assert.ok(
    !globalSource.includes('color-scheme: light dark;'),
    'Expected global styles to stop advertising light and dark color schemes.',
  );

  assert.ok(
    !globalSource.includes('.dark body'),
    'Expected global styles to stop applying dark body overrides.',
  );
});

test('chart grid keeps a single shared border system between cards', () => {
  const source = readFileSync(
    new URL('../components/charts/chart-grid.tsx', import.meta.url),
    'utf8',
  );

  assert.ok(
    source.includes('gap-px'),
    'Expected chart grid to use a single-pixel shared separator between cards.',
  );

  assert.ok(
    source.includes('border'),
    'Expected chart grid to keep an outer border around the card collection.',
  );
});
