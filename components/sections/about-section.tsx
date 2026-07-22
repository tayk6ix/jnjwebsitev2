import Image from "next/image"
import { Users, ShieldCheck, ThumbsUp, Clock } from "lucide-react"

// Edit these values to describe your company.
const highlights = [
  { icon: Users, title: "Family-owned", description: "A local business that treats every client like a neighbor." },
  { icon: ShieldCheck, title: "Licensed & insured", description: "Fully licensed with accountability built into every job." },
  { icon: ThumbsUp, title: "Experienced", description: "Years of hands-on commercial and residential work in NWA." },
  { icon: Clock, title: "Reliable", description: "We show up, communicate clearly, and finish what we start." },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image — replace with a real team or company photo */}
        <div className="relative order-last lg:order-first">
          <div aria-hidden className="absolute -left-3 -top-3 hidden size-24 border-l-4 border-t-4 border-accent lg:block" />
          <div aria-hidden className="absolute -bottom-3 -right-3 hidden size-24 border-b-4 border-r-4 border-accent lg:block" />
          <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
            <Image
              src="/Family.jpeg"
              alt="The J&J Construction team at a Northwest Arkansas jobsite"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Overlaid experience stat */}
          <div className="absolute bottom-0 left-0 flex items-baseline gap-2 bg-primary px-5 py-4 text-primary-foreground">
            <span className="font-heading text-4xl font-bold text-accent">15+</span>
            <span className="text-xs font-medium uppercase leading-tight tracking-wide">
              Years
              <br />
              in NWA
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6">
          <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-8 bg-accent" />
            About us
          </span>
          <h2 className="text-balance text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            A family-owned contractor Northwest Arkansas trusts
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            J&amp;J Construction LLC is a family-owned construction company built
            on accountability, craftsmanship, and clear communication. From
            commercial build-outs to residential remodels, we bring experience
            and professionalism to every project we take on across Northwest
            Arkansas.
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Our approach is simple: walk the site, understand the scope, and
            deliver quality work on a timeline you can count on. When you hire
            us, you get a partner who stands behind the finished result.
          </p>

          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center bg-background text-accent ring-1 ring-border">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
