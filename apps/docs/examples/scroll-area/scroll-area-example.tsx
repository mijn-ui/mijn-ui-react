import React from "react"
import { ScrollArea } from "@mijn-ui/react-scroll-area"
import { Separator } from "@mijn-ui/react-separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v0.0.1-beta.${a.length - i}`,
)

const ScrollAreaExample = () => {
  return (
    <ScrollArea className="rounded-medium border-small bg-card h-72 w-48">
      <div className="p-4">
        <h4 className="text-small mb-4 font-medium leading-none">Tags</h4>
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
