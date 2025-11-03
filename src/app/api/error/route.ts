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

export async function POST(request: Request) {
  if (!transporter) {
    console.error("SMTP credentials not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  try {
    const errorInfo = await request.json();
    //Limit the JSON to 10000 characters, I wouldn't read anything longer than that anyway.
    const safeJson = JSON.stringify(errorInfo, null, 2).slice(0, 10000);

    await transporter.sendMail({
      to: "gjmolter.1997@gmail.com",
      from: `"Site Error Report 🚨" <${SMTP_USERNAME}>`,
      subject: `Page: ${errorInfo?.url?.slice(0, 100) ?? "unknown page"}`,
      text: safeJson,
      html: `<pre>${safeJson.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
    });

    return NextResponse.json({ error: false });
  } catch (err) {
    console.error("Failed to send error email", err);
    return NextResponse.json({ error: "Failed to send error report" }, { status: 500 });
  }
}
