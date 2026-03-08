import { ChartGrid } from '@/components/charts/chart-grid';
import { SiteHeader } from '@/components/layout/site-header';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ChartGrid />
    </main>
  );
}
