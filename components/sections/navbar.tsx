"use client"

import { useEffect, useState } from "react"
import { HardHat, Menu, Phone } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

// Replace with your real navigation targets if section IDs change.
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Logo — swap the icon/text for a real logo image when available */}
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex w-[15vh] h-[5vh] relative items-center justify-center">
            <Image
              src="/LOGOv2.webp"
              alt="J&J Logo"
              fill
              priority
              sizes="20vw"
            />
          </span>
          <span
            className={cn(
              "font-heading text-lg font-bold uppercase tracking-tight transition-colors",
              scrolled ? "text-foreground" : "text-primary-foreground",
            )}
          >
            J&amp;J Construction{" "}
            <span className={scrolled ? "text-muted-foreground" : "text-primary-foreground/60"}>
              LLC
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/80 hover:text-primary-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+13145326893"
            className={cn(
              "flex items-center gap-1.5 text-sm font-semibold transition-colors",
              scrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-primary-foreground/80 hover:text-primary-foreground",
            )}
          >
            <Phone className="size-4" />
            {/* Replace with real phone number */}
            (314) 532-6893 
          </a>
          <Button size="lg" nativeButton={false} render={<a href="#contact" />}>
            Request Estimate
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant={scrolled ? "outline" : "secondary"}
                  size="icon-lg"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <HardHat className="size-4" />
                  </span>
                  J&amp;J Construction LLC
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <a
                        href={link.href}
                        className="rounded-md px-3 py-3 text-base font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-muted"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <a
                  href="tel:+13145326893"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <Phone className="size-4" />
                  (314) 532-6893
                </a>
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<a href="#contact" onClick={() => setOpen(false)} />}
                >
                  Request Estimate
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
