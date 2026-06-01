import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const siteUrl = "https://bimbok-portfolio.vercel.app"
const previewImageUrl = `${siteUrl}/og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bimbok (Bratik Mukherjee) | Full Stack Developer & Creative Technologist",
    template: "%s | Bimbok Portfolio",
  },
  description:
    "Explore the digital universe of Bratik Mukherjee (Bimbok). A Full Stack Developer and B.Tech IT student building high-performance web experiences, cinematic chronicles, and innovative software solutions.",
  keywords: [
    "Bratik Mukherjee",
    "Bimbok",
    "Bimbok Mukherjee",
    "Full Stack Developer",
    "B.Tech IT Student",
    "MERN Stack",
    "Next.js Developer",
    "Software Engineer Portfolio",
    "Creative Technologist",
    "Kolkata Web Developer",
  ],
  authors: [{ name: "Bratik Mukherjee", url: siteUrl }],
  creator: "Bratik Mukherjee (Bimbok)",
  publisher: "Bratik Mukherjee",
  verification: {
    google: "gFurputTJW0d-GTnJHv-VcLR0X_g7NSB-N2VV71rMno",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bimbok (Bratik Mukherjee) | Portfolio",
    description:
      "Full Stack Developer crafting cinematic web experiences and modern software solutions. Dive into my projects, skills, and journey.",
    url: siteUrl,
    siteName: "Bimbok Portfolio",
    type: "website",
    images: [
      {
        url: previewImageUrl,
        width: 1200,
        height: 630,
        alt: "Bratik Mukherjee (Bimbok) - Full Stack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bimbok (Bratik Mukherjee) | Full Stack Developer",
    description:
      "Crafting high-performance web experiences and cinematic chronicles. Explore my work and journey.",
    images: [previewImageUrl],
    creator: "@bimbok_mkj", // Placeholder - replace with your actual X handle if different
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  generator: "Next.js 15",
};

import ClientLayout from "@/components/client-layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
