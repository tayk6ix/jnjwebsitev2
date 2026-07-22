// Update these numbers with your real company metrics.
const stats = [
  { value: "15+", label: "Years of experience" },
  { value: "250+", label: "Projects completed" },
  { value: "Both", label: "Commercial & residential" },
  { value: "NWA", label: "Service area" },
]

export function StatsSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div aria-hidden className="hazard-stripe h-2 w-full opacity-90" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px bg-primary-foreground/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-start bg-primary px-2 py-10 lg:px-6"
          >
            <span className="font-heading text-5xl font-bold leading-none tracking-tight text-accent sm:text-6xl">
              {stat.value}
            </span>
            <span className="mt-3 text-sm font-medium uppercase tracking-wide text-primary-foreground/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
