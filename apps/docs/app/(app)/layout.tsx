import type { ReactNode } from "react"
import { Metadata } from "next"
import { Footer, Navbar } from "@/app/components/layout"

export const metadata: Metadata = {
  title: "React",
  description:
    "An open-source React component library built with Radix Primitives and Tailwind CSS for flexible, accessible, and responsive interfaces.",
}

export default function Layout({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Navbar />
      {children}
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
    </main>
  )
}
