"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Heading1 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { h1 } from "motion/react-client"

type InstagramPost = {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url?: string
  permalink: string
  thumbnail_url?: string
  timestamp: string
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function InstagramCarousel() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        const response = await fetch("/api/instagram")
        const data = await response.json()

        if (data.posts) {
          setPosts(data.posts)
        }
      } catch (error) {
        console.error("Failed to load Instagram posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [])

  if (loading) {
    return (
      <section id="insta_posts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Latest Updates
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Follow Our Work
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!posts.length) {
    return (
        <h1>THERE IS NO INSTA POSTS</h1>
    )
  }

  const carouselPosts = [...posts, ...posts]

  return (
    <section id="insta_posts" className="overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
              <InstagramIcon className="h-4 w-4" />
              Latest from Instagram
            </div>

            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              See Our Recent Work
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Follow J&J Construction LLC for project updates, jobsite progress,
              finished work, and construction highlights across Northwest
              Arkansas.
            </p>
          </div>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            View Instagram
            <ExternalLink className="ml-2 h-4 w-4" />
            </a>
        </div>
      </div>

      <div className="relative">
        <div className="instagram-carousel flex w-max gap-4 px-4">
          {carouselPosts.map((post, index) => {
            const imageUrl =
              post.media_type === "VIDEO"
                ? post.thumbnail_url || post.media_url
                : post.media_url

            if (!imageUrl) return null

            return (
              <a
                key={`${post.id}-${index}`}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className="group block w-70 shrink-0 md:w-90"
              >
                <Card className="overflow-hidden rounded-2xl border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="p-0">
                    <div className="relative aspect-4/5 overflow-hidden bg-muted">
                      <img
                        src={imageUrl}
                        alt={post.caption || "J&J Construction Instagram post"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80" />

                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <InstagramIcon className="h-4 w-4" />
                          Instagram
                        </div>

                        {post.caption && (
                          <p className="line-clamp-2 text-sm text-white/90">
                            {post.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
      </div>
    </section>
  )
}