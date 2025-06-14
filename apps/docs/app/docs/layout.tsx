"use client"

import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { baseOptions } from "@/app/layout.config"
import { source } from "@/app/source"
import { LeftRadialGradient } from "../components/decorators/gradient-bg"
import { Footer } from "../components/layout"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsLayout
        tree={source.pageTree}
        sidebar={{
          enabled: true,
          banner: <LeftRadialGradient />,
        }}
        containerProps={{
          // Hide the theme toggle and search component in the docs sidebar
          className:
            "[&_[data-theme-toggle]]:hidden [&_[data-search-full]]:hidden",
        }}
        {...baseOptions}
      >
        {children}
      </DocsLayout>
      <Footer>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Created by{" "}
          <a
            href="https://github.com/HTLA380"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#46427c] underline dark:text-[#8f8bb4]"
          >
            Htet Aung Lin
          </a>{" "}
          at{" "}
          <a
            href="https://www.linkedin.com/company/picoinno"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Pico
          </a>
        </p>
      </Footer>
    </>
  )
}
