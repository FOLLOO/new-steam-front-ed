
import type { Metadata } from "next";
import { myFont } from "../lib/fonts"
import { cn } from "@/lib/utils"

import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"


import "./globals.css";


export const metadata: Metadata = {
  title: "ADMIN",
  description: "BALALAIKA",
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            myFont.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
