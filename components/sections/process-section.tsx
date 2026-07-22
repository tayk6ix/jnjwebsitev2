import {
  MapPin,
  ClipboardList,
  Calculator,
  CalendarDays,
  Hammer,
  CheckCircle2,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Six-step client process — adjust copy to match how you actually work.
const steps = [
  { icon: MapPin, title: "Site Visit", description: "We walk the site with you to understand the space and goals." },
  { icon: ClipboardList, title: "Scope Review", description: "We define the full scope of work so nothing is left unclear." },
  { icon: Calculator, title: "Estimate", description: "You get a clear, itemized estimate with no surprises." },
  { icon: CalendarDays, title: "Scheduling", description: "We lock in a realistic timeline that fits your schedule." },
  { icon: Hammer, title: "Construction", description: "Our crew executes the work with quality and accountability." },
  { icon: CheckCircle2, title: "Final Walkthrough", description: "We review every detail together before we call it done." },
]

// Edit these FAQs to reflect your real answers.
const faqs = [
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. J&J Construction LLC is a licensed contractor and we carry the appropriate insurance for every project we take on.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve all over the United States. But our location is in Northwest Arkansas where we service Bentonville, Rogers, Fayetteville, Springdale, and the surrounding communities.",
  },
  {
    question: "Do you handle both commercial and residential work?",
    answer:
      "Yes. We take on commercial builds, tenant improvements, and subcontracting support, as well as residential homebuilding, remodels, repairs, and additions.",
  },
  {
    question: "How do estimates work?",
    answer:
      "After a site visit and scope review, we provide a clear, itemized estimate so you know exactly what to expect before any work begins.",
  },
]

export function ProcessSection() {
  return (
    <section id="processes" className="bg-background py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-8 bg-accent" />
            How it works
            <span className="h-px w-8 bg-accent" />
          </span>
          <h2 className="mt-4 text-balance text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            A clear, six-step process
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            We keep every project organized and transparent from the first
            visit to the final walkthrough.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-px border-l border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative flex flex-col gap-3 border-b border-r border-border bg-card p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <step.icon className="size-5" />
                </div>
                <span className="font-heading text-5xl font-bold leading-none text-border tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Common questions */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="text-center text-3xl tracking-tight text-foreground">
            Common questions
          </h3>
          <Accordion className="mt-6 border border-border bg-card px-5">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
