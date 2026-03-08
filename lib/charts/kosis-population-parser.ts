export interface KosisPopulationRow {
  PRD_DE?: string;
  DT?: string;
}

export interface PopulationBarDatum extends Record<string, string | number> {
  label: string;
  value: number;
}

function parsePopulationValue(rawValue: string) {
  const parsed = Number(rawValue.replaceAll(",", "").trim());

  return Number.isFinite(parsed) ? parsed : null;
}

export function parseKosisPopulationRows(rows: KosisPopulationRow[]): PopulationBarDatum[] {
  return rows
    .map((row) => {
      if (!row.PRD_DE || !row.DT) {
        return null;
      }

      const value = parsePopulationValue(row.DT);

      if (value === null) {
        return null;
      }

      return {
        label: row.PRD_DE,
        value,
      };
    })
    .filter((row): row is PopulationBarDatum => row !== null)
    .sort((left, right) => Number(left.label) - Number(right.label));
}
