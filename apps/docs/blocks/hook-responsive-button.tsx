"use client"

import dynamic from "next/dynamic"
import { LoaderCircle } from "lucide-react"

const ButtonWithHook = dynamic(
  () => import("./components/responsive-button/button-with-hook"),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
        <LoaderCircle className="mr-2 size-4 animate-spin" />
        Loading...
      </div>
    ),
  },
)

const ResponsiveButton = () => {
  return (
    <div className="flex size-full items-center justify-center">
      {/* screen size indicator */}
      <div className="absolute right-4 top-4 text-sm text-muted-foreground">
        <p className="block sm:hidden">initial</p>
        <p className="hidden sm:block md:hidden">sm</p>
        <p className="hidden md:block lg:hidden">md</p>
        <p className="hidden lg:block xl:hidden">lg</p>
        <p className="hidden xl:block">xl</p>
      </div>

      <ButtonWithHook />
    </div>
  )
}

export default ResponsiveButton
