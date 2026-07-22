import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  Services: [
    { label: "Commercial New Construction", href: "#services" },
    { label: "New Residential Home Building", href: "#services" },
    { label: "Commercial Remodels", href: "#services" },
    { label: "Tenant Improvements", href: "#services" },
    { label: "Residential Remodels & Additions", href: "#services" },
    { label: "Subcontractor Support", href: "#services" },
  ],
  Company: [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div aria-hidden className="hazard-stripe h-2 w-full" />
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand + contact */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex w-[15vh] h-[5vh] relative items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Image
                  src="/LOGOv2.webp"
                  alt="J&J Logo"
                  fill
                  priority
                  sizes="20vw"
                />
              </span>
              <span className="font-heading text-lg font-bold uppercase tracking-tight">
                J&amp;J Construction LLC
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Family-owned commercial and residential construction serving
              Northwest Arkansas with accountability and craftsmanship.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-accent" />
                {/* Replace with real phone */}
                <a href="tel:+13145326893" className="hover:text-primary-foreground">
                  (314) 532-6893
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-accent" />
                {/* Replace with real email */}
                <a
                  href="mailto:info@jnjconstructionllc.net"
                  className="hover:text-primary-foreground"
                >
                  info@jnjconstructionllc.net
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-accent" />
                Northwest Arkansas
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
                {heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} J&amp;J Construction LLC. All
            rights reserved.
          </p>
          <p>Licensed Contractor &middot; Northwest Arkansas</p>
        </div>
      </div>
    </footer>
  )
}
