import type { ReactNode } from "react"
import { Navbar, Footer } from "@/app/components/layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "React",
  description:
    "An open-source library inspired by NextUI and Shadcn/ui, built with Radix Primitives and Tailwind CSS.",
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
