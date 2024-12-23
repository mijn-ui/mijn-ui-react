import type { ReactNode } from "react"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import ThemeProvider from "./components/providers/theme-provider"
import "./css/global.css"
import { RootProvider } from "fumadocs-ui/provider"
import { baseUrl, createMetadata } from "@/lib/metadata"

const inter = Inter({
  subsets: ["latin"],
  fallback: ["sans-serif"],
})

export const metadata = createMetadata({
  title: {
    template: "%s | MijnUI",
    default: "MijnUI",
  },
  description:
    "An open-source library inspired by NextUI and Shadcn/ui, built with Radix Primitives and Tailwind CSS.",
  metadataBase: baseUrl,
})

// I'm not sure why the tailwindcss typography plugin isn't working in development mode.
// It might be due to my machine, but it works fine in production mode. As a temporary workaround,
// I'm including this code to ensure that all the tailwind typography classes work in development mode.
if (process.env.NODE_ENV === "development") {
  /* eslint-disable-next-line */
  // @ts-ignore: Cannot find module
  dynamic(() => import("./css/prose.css"))
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <RootProvider
            theme={{
              enabled: false,
            }}
            search={{
              options: {
                api: "/react/api/search",
                type: "fetch",
              },
            }}
          >
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
