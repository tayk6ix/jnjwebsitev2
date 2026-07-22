import {
  Building2,
  Store,
  Home,
  Wrench,
  Plus,
  HardHat,
  ArrowUpRight,
} from "lucide-react"
import Image from "next/image"

// Edit service names, descriptions, and icons to match your offerings.
const services = [
  {
    icon: Building2,
    title: "Commercial/Residential Remodels",
    description:
      "Full interior and exterior remodels for offices, retail, and commercial spaces built to keep your business running.",
  },
  {
    icon: Store,
    title: "Tenant Improvements",
    description:
      "Custom build-outs and TI work that turn leased space into a functional, code-compliant environment.",
  },
  {
    icon: Home,
    title: "Residential Remodels & Additions",
    description:
      "Kitchens, baths, basements, porches, canopies, and whole-home renovations/additions finished with craftsmanship and care.",
  },
  {
    icon: Wrench,
    title: "Subcontractor Support",
    description:
      "Subcontracting support that keep larger projects on schedule and on spec.",
  }
  
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-border pb-8 sm:gap-6 sm:pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-8 bg-accent" />
              What we do
            </span>
            <h2 className="mt-4 text-balance text-[2rem] leading-[0.98] tracking-tight text-foreground sm:text-5xl sm:leading-[0.95]">
              Built for every kind of project
            </h2>
          </div>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            From your dream home to your new office, we bring the same standard of quality and accountability to every job.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-px border border-border bg-border sm:mt-10 sm:grid-cols-1 lg:grid-cols-2">
          <div className="group relative isolate flex min-h-[360px] flex-col justify-end gap-4 overflow-hidden bg-background p-6 sm:p-8">
            {/* Background image */}
            <Image
              src="/project-section/Commercial-framing.jpeg"
              alt="J&J Construction crew working on a commercial jobsite in Northwest Arkansas"
              fill
              sizes="(min-width: 640px) 40vw, 100vw"
              className="z-0 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/10"
            />

            {/* Card content */}
            <div className="relative z-20 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-4xl font-bold text-white/30 transition-colors duration-300 group-hover:text-accent/40">
                  01
                </span>
              </div>

              <h3 className="flex items-center gap-2 text-lg tracking-tight text-white sm:text-xl">
                Commercial Buildings

                <ArrowUpRight className="size-5 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h3>

              <p className="text-sm leading-relaxed text-white/75">
                From site preparation to final walkthrough, we help bring new residential
                builds to life with a practical, organized, and quality-focused
                construction process.
              </p>
            </div>
          </div>
          <div className="group relative isolate flex min-h-[360px] flex-col justify-end gap-4 overflow-hidden bg-background p-6 sm:p-8">
            {/* Background image */}
            <Image
              src="/project-section/1-Langholm.JPG"
              alt="J&J Construction crew working on a commercial jobsite in Northwest Arkansas"
              fill
              sizes="(min-width: 640px) 40vw, 100vw"
              className="z-0 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/10"
            />

            {/* Card content */}
            <div className="relative z-20 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-4xl font-bold text-white/30 transition-colors duration-300 group-hover:text-accent/40">
                  02
                </span>
              </div>

              <h3 className="flex items-center gap-2 text-lg tracking-tight text-white sm:text-xl">
                New Residential Home Building

                <ArrowUpRight className="size-5 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h3>

              <p className="text-sm leading-relaxed text-white/75">
                From site preparation to final walkthrough, we help bring new residential
                builds to life with a practical, organized, and quality-focused
                construction process.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px border border-border bg-border sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative flex flex-col gap-4 bg-background p-6 transition-colors duration-300 hover:bg-card sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center bg-secondary text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon className="size-6" />
                </div>
                <span className="font-heading text-4xl font-bold text-border transition-colors duration-300 group-hover:text-accent/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="flex items-center gap-2 text-lg tracking-tight text-foreground sm:text-xl">
                {service.title}
                <ArrowUpRight className="size-5 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
