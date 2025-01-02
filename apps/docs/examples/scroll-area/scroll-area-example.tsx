import React from "react"

import { ScrollArea } from "@mijn-ui/react-scroll-area"
import { Separator } from "@mijn-ui/react-separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v0.0.1-beta.${a.length - i}`,
)

const ScrollAreaExample = () => {
  return (
    <ScrollArea className="h-72 w-48 rounded-medium border-small bg-surface">
      <div className="p-4">
        <h4 className="mb-4 text-small font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div key={tag} className="text-small">
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}

export default ScrollAreaExample
