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
      <Footer />
    </main>
  )
}
