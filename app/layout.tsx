"use client"

import type React from "react"

import { Inter } from "next/font/google"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Create a theme instance
const theme = createTheme({
  // Your theme configuration here
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

