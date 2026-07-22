"use client"

import Image from "next/image"
import { ArrowRight, BadgeCheck, Building2, MapPin } from "lucide-react"
import { motion, MotionConfig, type Variants } from "motion/react"

import { Button } from "@/components/ui/button"

const badges = [
  { icon: BadgeCheck, label: "Licensed Contractor" },
  { icon: MapPin, label: "NWA Based" },
  { icon: Building2, label: "Commercial & Residential" },
]

const easeOut = [0.22, 1, 0.36, 1] as const

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.13,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeOut,
    },
  },
}

const backgroundVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: easeOut,
    },
  },
}

export function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="relative isolate overflow-hidden bg-primary"
      >
        {/* Animated full-bleed jobsite photo */}
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 -z-10"
        >
          <Image
            src="/project-section/Joplin.jpg"
            alt="J&J Construction crew working on a commercial jobsite in Northwest Arkansas"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"
          />
        </motion.div>

        <div className="mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-40">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 border-l-4 border-accent bg-primary-foreground/5 py-1.5 pl-3 pr-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground backdrop-blur-sm"
            >
              <span className="size-1.5 bg-accent" />
              Located in Northwest Arkansas
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mt-5 text-balance text-[2.75rem] leading-[0.95] tracking-tight text-primary-foreground sm:mt-6 sm:text-7xl sm:leading-[0.92] lg:text-8xl"
            >
              We Build It <span className="text-accent">Right.</span>
              <br />
              The First Time.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:mt-6 sm:text-lg"
            >
              Commercial and residential construction across Northwest Arkansas
              — new builds, remodels, tenant improvements, repairs, additions,
              and subcontract support, built with accountability.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                nativeButton={false}
                className="w-full sm:w-auto"
                render={<a href="#contact" />}
              >
                Request an Estimate
                <ArrowRight data-icon="inline-end" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                render={<a href="#projects" />}
              >
                View Our Work
              </Button>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-primary-foreground/15 pt-6 sm:mt-10 sm:gap-x-8"
            >
              {badges.map((badge) => {
                const Icon = badge.icon

                return (
                  <li
                    key={badge.label}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground sm:text-sm"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4 text-accent"
                    />
                    {badge.label}
                  </li>
                )
              })}
            </motion.ul>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}