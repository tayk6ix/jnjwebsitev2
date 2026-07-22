import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30, "Phone number is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150, "Email address is too long."),

  location: z
    .string()
    .trim()
    .max(150, "Location is too long.")
    .optional()
    .default(""),

  projectType: z
    .string()
    .trim()
    .min(1, "Please select a project type.")
    .max(100, "Project type is too long."),

  message: z
    .string()
    .trim()
    .max(5000, "Message is too long.")
    .optional()
    .default(""),

  // Honeypot field. Real users should leave this empty.
  website: z.string().max(0).optional().default(""),
})

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.")

      return NextResponse.json(
        { error: "The contact service is not configured." },
        { status: 500 },
      )
    }

    const body: unknown = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      const firstError = result.error.issues[0]?.message

      return NextResponse.json(
        {
          error: firstError ?? "Please check the submitted information.",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const {
      name,
      phone,
      email,
      location,
      projectType,
      message,
      website,
    } = result.data

    // Silently accept likely bot submissions.
    if (website) {
      return NextResponse.json({ success: true })
    }

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ??
      "J&J Construction <onboarding@resend.dev>"

    const toEmail =
      process.env.CONTACT_TO_EMAIL ?? "info@jnjconstructionllc.net"

    const safeName = escapeHtml(name)
    const safePhone = escapeHtml(phone)
    const safeEmail = escapeHtml(email)
    const safeLocation = escapeHtml(location || "Not provided")
    const safeProjectType = escapeHtml(projectType)
    const safeMessage = escapeHtml(message || "No additional message provided")
      .replaceAll("\n", "<br />")

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],

      // Replies will go directly to the prospective customer.
      replyTo: email,

      subject: `New estimate request: ${projectType} — ${name}`,

      text: [
        "New project estimate request",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Location: ${location || "Not provided"}`,
        `Project type: ${projectType}`,
        "",
        "Project details:",
        message || "No additional message provided",
      ].join("\n"),

      html: `
        <div
          style="
            max-width: 640px;
            margin: 0 auto;
            padding: 32px;
            background: #ffffff;
            color: #171717;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <div
            style="
              border-top: 5px solid #b7791f;
              border-left: 1px solid #e5e5e5;
              border-right: 1px solid #e5e5e5;
              border-bottom: 1px solid #e5e5e5;
              padding: 28px;
            "
          >
            <p
              style="
                margin: 0 0 8px;
                color: #b7791f;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
              "
            >
              J&amp;J Construction
            </p>

            <h1 style="margin: 0 0 24px; font-size: 25px;">
              New project estimate request
            </h1>

            <table
              cellpadding="0"
              cellspacing="0"
              style="width: 100%; border-collapse: collapse;"
            >
              <tbody>
                <tr>
                  <td style="padding: 9px 0; font-weight: 700;">Name</td>
                  <td style="padding: 9px 0;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; font-weight: 700;">Phone</td>
                  <td style="padding: 9px 0;">
                    <a href="tel:${safePhone}">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; font-weight: 700;">Email</td>
                  <td style="padding: 9px 0;">
                    <a href="mailto:${safeEmail}">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; font-weight: 700;">Location</td>
                  <td style="padding: 9px 0;">${safeLocation}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; font-weight: 700;">
                    Project type
                  </td>
                  <td style="padding: 9px 0;">${safeProjectType}</td>
                </tr>
              </tbody>
            </table>

            <div style="margin-top: 24px;">
              <p style="margin: 0 0 8px; font-weight: 700;">
                Project details
              </p>
              <div
                style="
                  padding: 16px;
                  background: #f5f5f5;
                  line-height: 1.6;
                "
              >
                ${safeMessage}
              </div>
            </div>

            <p style="margin: 24px 0 0; color: #737373; font-size: 12px;">
              Submitted through the J&amp;J Construction website.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend contact form error:", error)

      return NextResponse.json(
        { error: "We could not send your request. Please call or email us." },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    })
  } catch (error) {
    console.error("Contact form route error:", error)

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}