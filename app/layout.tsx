import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bimbok - Full Stack Developer & Digital Creator",
  description:
    "Portfolio of Bimbok Bratik Mukherjee- B.Tech IT student, Full Stack Developer specializing in MERN stack, Python, and creating accessible digital solutions.",
  keywords: "Bimbok, Bratik, Bratik Mukherjee, Full Stack Developer, React, Node.js, Python, MERN Stack, Web Development, Portfolio",
  authors: [{ name: "Bimbok" }],
  openGraph: {
    title: "Bimbok - Full Stack Developer & Digital Creator",
    description: "Building digital solutions that make technology accessible to everyone",
    type: "website",
  },
    generator: 'v0.dev'
}

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
