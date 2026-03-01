import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const siteUrl = "https://bimbok-portfolio.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bratik Mukherjee (Bimbok) | Full Stack Developer Portfolio",
    template: "%s | Bimbok Portfolio",
  },
  description:
    "Official portfolio of Bratik Mukherjee (Bimbok Mukherjee): full stack developer building with MERN, Next.js, React, Node.js, Python, and modern UI systems.",
  keywords: [
    "Bratik Mukherjee",
    "Bimbok Mukherjee",
    "bimbok",
    "bratik",
    "bratik mkj",
    "bimbok mkj",
    "Bimbok portfolio",
    "Bratik portfolio",
    "full stack developer portfolio",
    "MERN developer",
    "Next.js developer",
    "React developer",
    "Node.js developer",
    "Python developer",
    "web developer Kolkata",
    "software developer portfolio",
  ],
  authors: [{ name: "Bimbok" }],
  verification: {
    google: "gFurputTJW0d-GTnJHv-VcLR0X_g7NSB-N2VV71rMno",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bratik Mukherjee (Bimbok) | Full Stack Developer Portfolio",
    description:
      "Explore the portfolio of Bratik Mukherjee (Bimbok): projects, skills, and full stack development work.",
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
    title: "Bratik Mukherjee (Bimbok) | Full Stack Developer",
    description:
      "Portfolio, projects, and technical work by Bratik Mukherjee (Bimbok).",
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
