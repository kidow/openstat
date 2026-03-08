import { getKosisPopulationBarChartData } from "@/lib/charts/kosis-population";

import { PopulationBarChartClient } from "./population-bar-chart-client";

export async function KosisPopulationBarChart() {
  const data = await getKosisPopulationBarChartData();

  return <PopulationBarChartClient data={data} />;
}
