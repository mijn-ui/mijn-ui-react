"use client"

import React from "react"
import COMPONENT_REGISTRY from "@/registry"
import { Loader2 } from "lucide-react"

const LazyComponentPreview = ({ name }: { name: string }) => {
  const Preview = React.useMemo(() => {
    const Component = COMPONENT_REGISTRY[name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading...
        </div>
      }
    >
      {Preview}
    </React.Suspense>
  )
}

export default LazyComponentPreview
