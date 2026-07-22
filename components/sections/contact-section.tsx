"use client"

import { useState, type FormEvent } from "react"
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Update contact details with your real business info.
const contactInfo = [
  {
    icon: Phone,
    label: "Call us",
    value: "(314) 532-6893",
    href: "tel:+3145326893",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "info@jnjconstructionllc.net",
    href: "mailto:info@jnjconstructionllc.net",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Northwest Arkansas",
    href: undefined,
  },
]

const projectTypes = [
  "Commercial New Construction",
  "New Residential Home Building",
  "Tenant Improvement",
  "Residential Remodel",
  "Commercial Remodel",
  "Residential Addition",
  "Commercial Addition",
  "Subcontractor Support",
  "Federal Work",
  "Other",
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [projectType, setProjectType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return

    const form = event.currentTarget
    const formData = new FormData(form)

    setErrorMessage("")

    if (!projectType) {
      setErrorMessage("Please select a project type.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          location: formData.get("location"),
          projectType,
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      })

      const result = (await response.json()) as {
        success?: boolean
        error?: string
      }

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit the form.")
      }

      form.reset()
      setProjectType("")
      setSubmitted(true)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the form. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Left: intro + contact cards */}
          <div className="lg:col-span-2">
            <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
              <span className="h-px w-8 bg-accent" />
              Get in touch
            </span>
            <h2 className="mt-4 text-balance text-[2rem] leading-[0.98] tracking-tight text-foreground sm:text-5xl sm:leading-[0.95]">
              Request a project estimate
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Tell us about your project and we&apos;ll reach out to schedule a
              site visit. The more detail you share, the faster we can help.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {contactInfo.map((item) => {
                const content = (
                  <div className="flex items-center gap-4 border-l-2 border-border bg-card p-4 transition-colors hover:border-accent">
                    <div className="flex size-11 shrink-0 items-center justify-center bg-secondary text-primary">
                      <item.icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="break-words text-sm font-semibold text-foreground sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="border-x border-b border-t-4 border-border border-t-accent bg-card p-5 shadow-sm sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Thanks — we&apos;ll be in touch!
                  </h3>
                  <p className="max-w-sm text-muted-foreground">
                    Your request has been received. A member of our team will
                    reach out shortly to schedule your site visit.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false)
                      setErrorMessage("")
                    }}
                  >
                    Submit another request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <FieldGroup>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                          id="name"
                          name="name"
                          required
                          disabled={isSubmitting}
                          placeholder="Your full name"
                          className="h-10"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          disabled={isSubmitting}
                          placeholder="(479) 555-1234"
                          className="h-10"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          disabled={isSubmitting}
                          placeholder="you@example.com"
                          className="h-10"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input
                          id="location"
                          name="location"
                          disabled={isSubmitting}
                          placeholder="City in Northwest Arkansas"
                          className="h-10"
                        />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="project-type">Project Type</FieldLabel>

                      <Select
                        value={projectType}
                        onValueChange={(value) => {
                          setProjectType(value ?? "")
                          setErrorMessage("")
                        }}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          id="project-type"
                          className="h-10 w-full"
                          aria-required="true"
                        >
                          <SelectValue placeholder="Select a project type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about the scope, timeline, and any details that would help."
                        disabled={isSubmitting}
                      />
                    </Field>

                    {errorMessage && (
                      <div
                        role="alert"
                        className="border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      >
                        {errorMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="mt-1 w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending Request..." : "Request Estimate"}

                      {!isSubmitting && <ArrowRight data-icon="inline-end" />}
                    </Button>
                  </FieldGroup>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
