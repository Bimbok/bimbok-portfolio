import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const siteUrl = "https://bimbok-portfolio.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bimbok | Full Stack Developer",
    template: "%s | Bimbok Portfolio",
  },
  description:
    "Portfolio of Bratik Mukherjee (Bimbok), a full stack developer focused on MERN, Python, and accessible digital products.",
  keywords:
    "Bimbok, Bratik Mukherjee, full stack developer, MERN, Next.js, React, Node.js, Python, portfolio",
  authors: [{ name: "Bimbok" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bimbok | Full Stack Developer",
    description:
      "Building polished, accessible web experiences with modern JavaScript and TypeScript stacks.",
    url: siteUrl,
    siteName: "Bimbok Portfolio",
    type: "website",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 512,
        height: 512,
        alt: "Bimbok Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bimbok | Full Stack Developer",
    description:
      "Building polished, accessible web experiences with modern JavaScript and TypeScript stacks.",
    images: ["/placeholder-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  generator: "next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
