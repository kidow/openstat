interface ChartCardProps {
  title: string;
  description: string;
}

export function ChartCard({ title, description }: ChartCardProps) {
  return (
    <article className="bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
      <div className="mt-4 h-40 rounded-md bg-zinc-100" />
    </article>
  );
}
