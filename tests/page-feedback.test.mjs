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
