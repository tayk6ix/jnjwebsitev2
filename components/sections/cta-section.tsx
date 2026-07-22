import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      {/* Jobsite backdrop — replace with a real project photo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/project-new-construction.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/60"
        />
      </div>

      <div aria-hidden className="hazard-stripe h-2 w-full" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-8 bg-accent" />
            Ready when you are
          </span>
          <h2 className="mt-4 text-balance text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
            Let&apos;s review the scope, and build a clear plan
            you can count on.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button size="lg" nativeButton={false} render={<a href="#contact" />}>
            Request Estimate
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<a href="tel:+13145326893" />}
          >
            <Phone data-icon="inline-start" />
            (314) 532-6893
          </Button>
        </div>
      </div>
    </section>
  )
}
