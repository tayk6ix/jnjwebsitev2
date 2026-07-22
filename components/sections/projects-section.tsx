"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

const projects = [
  {
    name: "My Place Hotel",
    location: "Jonesboro, AR",
    type: "Commercial",
    scope: "New hotel build",
    image: "/project-section/Hotel.jpeg",
  },
  {
    name: "Beautiful Modern Home",
    location: "Bella Vista, AR",
    type: "Residential",
    scope: "",
    image: "/project-section/1-Langholm.webp",
  },
  {
    name: "Full Home Remodel",
    location: "Joplin, MO",
    type: "Residential/Commercial Remodels",
    scope: "Foundation and up full renovation",
    image: "/project-section/Joplin.jpg",
  },
  {
    name: "Hatchery",
    location: "Rogers, AR",
    type: "Tenant Improvements",
    scope:
      "Turn-key tenant improvement transforming a shell space into a ready-to-open retail storefront.",
    image: "/project-section/Hatchery-after.jpeg",
  },
  {
    name: "Framing Crew",
    location: "Nationwide",
    type: "Subcontractor Support",
    scope:
      "The right support required to complete any project in a timely and quality manner.",
    image: "/project-section/Labor.jpeg",
  },
  {
    name: "Coming Soon Modern Residential Home",
    location: "Bella Vista, AR",
    type: "Design and Build",
    scope:
      "Semi-custom home, from finding the right piece of land and designing your dream home to delivering a fully finished residence.",
    image: "/project-section/19-Oniel.avif",
  },
]

export function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedProject =
    selectedIndex !== null ? projects[selectedIndex] : null

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null

      return current === 0 ? projects.length - 1 : current - 1
    })
  }, [])

  const showNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null

      return current === projects.length - 1 ? 0 : current + 1
    })
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox()
      }

      if (event.key === "ArrowLeft") {
        showPrevious()
      }

      if (event.key === "ArrowRight") {
        showNext()
      }
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex, closeLightbox, showPrevious, showNext])

  return (
    <>
      <section id="projects" className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
                <span className="h-px w-8 bg-accent" />
                Featured work
              </span>

              <h2 className="mt-4 text-balance text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl">
                Recent projects
              </h2>
            </div>

            <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
              A look at the commercial and residential work we&apos;ve delivered
              for clients throughout the region.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View a larger photo of ${project.name}`}
                className={cn(
                  "group relative flex cursor-zoom-in items-end overflow-hidden bg-primary text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  index === 0 &&
                    "aspect-4/3 md:col-span-4 md:row-span-2 md:aspect-auto md:min-h-104",
                  index === 1 &&
                    "aspect-4/3 md:col-span-2 md:aspect-auto md:min-h-104",
                  index > 1 && "aspect-4/3 md:col-span-2",
                )}
              >
                <Image
                  src={project.image}
                  alt={`${project.name} — ${project.type} in ${project.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-primary via-primary/40 to-transparent"
                />

                <div className="relative flex w-full flex-col gap-2 p-6">
                  <span className="inline-flex w-fit items-center bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                    {project.type}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary-foreground/70">
                    <MapPin className="size-3.5" />
                    {project.location}
                  </div>

                  <h3 className="flex items-center gap-2 text-xl tracking-tight text-primary-foreground">
                    {project.name}

                    <ArrowUpRight className="size-5 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>

                  {index === 0 && project.scope && (
                    <p className="max-w-md text-sm leading-relaxed text-primary-foreground/75">
                      {project.scope}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.name} image viewer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox()
            }
          }}
        >
          <div className="relative flex h-full max-h-[900px] w-full max-w-7xl flex-col">
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="absolute right-0 top-0 z-20 flex size-11 items-center justify-center bg-black/60 text-white transition-colors hover:bg-black"
            >
              <X className="size-6" />
            </button>

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={`${selectedProject.name} — ${selectedProject.type} in ${selectedProject.location}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />

              {projects.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="View previous project"
                    className="absolute left-0 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center bg-black/50 text-white transition-colors hover:bg-black/80 sm:left-4"
                  >
                    <ChevronLeft className="size-7" />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="View next project"
                    className="absolute right-0 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center bg-black/50 text-white transition-colors hover:bg-black/80 sm:right-4"
                  >
                    <ChevronRight className="size-7" />
                  </button>
                </>
              )}
            </div>

            <div className="shrink-0 bg-black/75 px-5 py-4 text-white backdrop-blur-md">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {selectedProject.type}
                  </span>

                  <h3 className="mt-1 text-xl font-semibold">
                    {selectedProject.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                    <MapPin className="size-4" />
                    {selectedProject.location}
                  </div>
                </div>

                <span className="text-sm text-white/60">
                  {selectedIndex + 1} / {projects.length}
                </span>
              </div>

              {selectedProject.scope && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                  {selectedProject.scope}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}