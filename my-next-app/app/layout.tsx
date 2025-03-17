import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI App Generator",
  description: "Build your dream app with AI assistance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="container mx-auto py-4 px-4">
              <nav className="flex justify-between items-center">
                <a href="/" className="text-xl font-bold">
                  AI App Generator
                </a>
                <div className="flex items-center gap-4">
                  <a href="/chat" className="text-sm font-medium hover:underline">
                    Chat
                  </a>
                  <a
                    href="https://github.com/yourusername/ai-app-generator"
                    className="text-sm font-medium hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} AI App Generator. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

