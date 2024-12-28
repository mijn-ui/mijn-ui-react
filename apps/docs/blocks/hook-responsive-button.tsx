"use client"

import Loading from "@/app/loading"
import dynamic from "next/dynamic"

const ButtonWithHook = dynamic(
  () => import("./components/responsive-button/button-with-hook"),
  { ssr: false, loading: () => <Loading /> },
)

const ResponsiveButton = () => {
  return (
    <div className="flex size-full items-center justify-center">
      {/* screen size indicator */}
      <div className="text-muted-text absolute right-4 top-4 text-sm">
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
