import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Molter | Full-Stack Developer",
  description:
    "Full-Stack Developer in Vancouver with a passion for FOSS and the impact of technology on society. I build websites and digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${montserrat.variable} antialiased`}>{children}</body>
      </html>
    </ViewTransitions>
  );
}
