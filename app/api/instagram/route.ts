import { NextResponse } from "next/server"

type InstagramMediaItem = {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url?: string
  permalink: string
  thumbnail_url?: string
  timestamp: string
}

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accessToken) {
    return NextResponse.json(
      { error: "Missing INSTAGRAM_ACCESS_TOKEN" },
      { status: 500 }
    )
  }

  try {
    /**
     * Legacy Basic Display-style endpoint:
     * https://graph.instagram.com/me/media
     *
     * If your Meta app uses the newer Instagram API / Graph API setup,
     * this endpoint may need to be adjusted depending on your account type,
     * permissions, and Instagram user ID.
     */
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "permalink",
      "thumbnail_url",
      "timestamp",
    ].join(",")

    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`

    const response = await fetch(url, {
      // Cache for 1 hour so your site does not hit Instagram every page load
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      const errorText = await response.text()

      return NextResponse.json(
        {
          error: "Failed to fetch Instagram media",
          details: errorText,
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    const posts: InstagramMediaItem[] = data.data ?? []

    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected error fetching Instagram media",
      },
      { status: 500 }
    )
  }
}