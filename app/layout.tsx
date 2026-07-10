import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import type { Viewport } from "next"
import { CartProvider } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

export const metadata: Metadata = {
  title: {
    default: "مياه العين | مياه صحية نقية",
    template: "%s | مياه العين"
  },
  description: "مياه العين - مياه شرب صحية ونقية. اكتشف مجموعتنا الواسعة من المياه المعبأة والمياه الوظيفية والمجموعة المميزة.",
  keywords: ["مياه العين", "مياه معبأة", "مياه صحية", "al ain water"],
  metadataBase: new URL('https://alainwater.com'),
  openGraph: {
    title: "مياه العين",
    description: "مياه شرب صحية ونقية",
    siteName: "مياه العين",
    locale: "ar_AE",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <CartProvider>
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
