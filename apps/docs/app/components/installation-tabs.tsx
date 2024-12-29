"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@mijn-ui/react-tabs"
import React from "react"
import Alert from "./mdx-alert"

type InstallationTabsProps = React.ComponentProps<typeof Tabs> & {
  items: string[]
}

const InstallationTabs = ({
  items,
  children,
  ...props
}: InstallationTabsProps) => {
  const [value, onValueChange] = React.useState(items[0])

  return (
    <Tabs
      className="mb-8"
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <TabsList className="h-12 w-full justify-start rounded-none border-b !bg-transparent">
        {items.map((item) => (
          <TabsTrigger
            className="rounded-md data-[state=active]:bg-surface"
            key={item}
            value={item}
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>

      {value.toLocaleLowerCase() === "npm" && (
        <Alert
          color={"danger"}
          title=""
          description="NPM packages are currently unstable and may cause issues. Use it at your own risk."
          className="unstable_alert mt-3 [&>p]:mt-0"
        />
      )}
      {children}
    </Tabs>
  )
}

export { InstallationTabs, TabsContent as InstallationTabsContent }
