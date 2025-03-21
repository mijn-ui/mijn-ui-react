import React from "react"
import COMPONENT_REGISTRY from "@/registry"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@mijn-ui/react"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { getSourceCode } from "@/app/utils/get-source-code"
import LazyComponentPreview from "./lazy-component-preview"
import PreviewWrapper from "./preview-wrapper"

type CodePreviewerProps = {
  name: string
  tabs?: boolean
  hideCode?: boolean
} & React.ComponentPropsWithoutRef<"div">

const ComponentPreview = ({
  name,
  hideCode = false,
  ...props
}: CodePreviewerProps) => {
  const sourcePath = COMPONENT_REGISTRY[name]?.source
  const code = getSourceCode(sourcePath)

  return (
    <Tabs defaultValue="preview">
      {!hideCode && (
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
      )}

      <TabsContent value="preview">
        <PreviewWrapper {...props}>
          <LazyComponentPreview name={name} />
        </PreviewWrapper>
      </TabsContent>

      {!hideCode && (
        <TabsContent value="code">
          <DynamicCodeBlock lang="tsx" code={code} />
        </TabsContent>
      )}
    </Tabs>
  )
}

export default ComponentPreview
