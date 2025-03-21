import React from "react"
import COMPONENT_REGISTRY from "@/registry"
import { Tabs, TabsContent, TabsList, TabsTrigger, cn } from "@mijn-ui/react"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { getSourceCode } from "@/app/utils/get-source-code"
import LazyComponentPreview from "./lazy-component-preview"

type CodePreviewerProps = {
  name: string
} & React.ComponentPropsWithoutRef<"div">

const ComponentPreview = ({
  name,
  className,
  ...props
}: CodePreviewerProps) => {
  const sourcePath = COMPONENT_REGISTRY[name]?.source
  const code = getSourceCode(sourcePath)

  return (
    <Tabs defaultValue="preview" className="mb-8">
      <TabsList className="mb-2 h-12 w-full justify-start rounded-none border-b !bg-transparent">
        <TabsTrigger
          className="rounded-medium data-[state=active]:bg-default"
          value="preview"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          className="rounded-medium data-[state=active]:bg-default"
          value="code"
        >
          Code
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div
          className={cn(
            "preview not-prose relative my-6 flex min-h-80 w-full items-center justify-center gap-5 rounded-large border-small p-5",
            className,
          )}
          {...props}
        >
          <LazyComponentPreview name={name} />
        </div>
      </TabsContent>

      <TabsContent value="code">
        <DynamicCodeBlock lang="tsx" code={code} />
      </TabsContent>
    </Tabs>
  )
}

export default ComponentPreview
