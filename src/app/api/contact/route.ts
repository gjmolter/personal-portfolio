import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_SECURITY } = process.env as Record<
  string,
  string | undefined
>;

const transporter =
  SMTP_USERNAME && SMTP_PASSWORD && SMTP_HOST && SMTP_PORT
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: SMTP_SECURITY === "true",
        auth: { user: SMTP_USERNAME, pass: SMTP_PASSWORD },
      })
    : null;

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const MAX_LENGTH = { name: 200, email: 254, message: 5000 };

function escapeHtml(text: string): string {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: Request) {
  if (!transporter) {
    console.error("SMTP credentials not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (
      trimmedName.length > MAX_LENGTH.name ||
      trimmedEmail.length > MAX_LENGTH.email ||
      trimmedMessage.length > MAX_LENGTH.message
    ) {
      return NextResponse.json({ error: "Field length exceeded" }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: `"Website Contact Form" <${SMTP_USERNAME}>`,
      to: `"Gabriel Molter" <me@gabrielmolter.com>`,
      replyTo: `"${trimmedName}" <${trimmedEmail}>`,
      subject: `New contact form submission from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
      html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`,
    });

    return NextResponse.json({ error: false });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
