"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@mijn-ui/react"
import Alert from "./alert"

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
            className="rounded-medium data-[state=active]:bg-default"
            key={item}
            value={item}
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>

      {value.toLocaleLowerCase() === "npm" && (
        <Alert color={"danger"} className="unstable_alert mt-3">
          NPM packages are currently unstable and may cause issues. Use it at
          your own risk.
        </Alert>
      )}
      {children}
    </Tabs>
  )
}

export { InstallationTabs, TabsContent as InstallationTabsContent }
