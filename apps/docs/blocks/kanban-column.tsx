"use client"

import * as React from "react"
import { Button } from "@mijn-ui/react"
import { EllipsisVertical, Plus } from "lucide-react"
import {
  Kanban,
  KanbanColumn,
  KanbanContainer,
  KanbanContent,
  KanbanDraggable,
  KanbanFooter,
  KanbanHeader,
  KanbanItemCount,
  KanbanTitle,
} from "./components/kanban-column"
import KanbanCardItem from "./components/kanban-column/components/kanban-card-item"
import {
  KanbanCardItemType,
  KanbanContainerType,
} from "./components/kanban-column/components/types"

// Default Kanban container data for initial state
const DEFAULT_VALUE: KanbanContainerType[] = [
  {
    id: `container-1`,
    title: "Todo",
    items: [
      {
        id: `item-1`, // Must start with `item` for drag-and-drop to work correctly
        title: "Creating wireframes for iOS application",
        tags: ["Wireframe"],
        progress: 75,
        status: {
          createdAt: "3d",
          comments: "2",
          attachment: "5",
        },
        users: [
          {
            name: "Anthony",
            avatar:
              "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
          },
          {
            name: "Susie",
            avatar: "",
          },
          {
            name: "John Doe",
            avatar:
              "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
          },
          {
            name: "John Doe",
            avatar:
              "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
          },
          {
            name: "John Doe",
            avatar:
              "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
          },
          {
            name: "John Doe",
            avatar:
              "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
          },
        ],
      },
      {
        id: `item-2`, // Must start with `item` for drag-and-drop to work correctly
        title: "Creating wireframes for iOS application",
        status: {
          createdAt: "3d",
        },
        users: [
          {
            name: "Anthony",
            avatar:
              "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
          },
        ],
      },
      {
        id: `item-3`, // Must start with `item` for drag-and-drop to work correctly
        title: "Presentation Slide Design",
        tags: ["Design"],
        progress: 75,
        status: {
          createdAt: "5d",
        },
        users: [
          {
            name: "Anthony",
            avatar:
              "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
          },
          {
            name: "Susie",
            avatar: "",
          },
        ],
      },
    ],
  },
]

const KanbanExample = () => {
  const [values, setValues] =
    React.useState<KanbanContainerType[]>(DEFAULT_VALUE)

  return (
    <div className="flex size-full items-center justify-center">
      <Kanban value={values} setValue={setValues}>
        <KanbanContainer>
          {values.map((container) => (
            <KanbanColumn key={container.id} className="w-full max-w-[352px]">
              <KanbanHeader className="pr-2">
                <div className="flex items-center gap-2">
                  <KanbanTitle className="text-medium sm:text-large">
                    {container.title}
                  </KanbanTitle>
                  <KanbanItemCount>{container.items.length}</KanbanItemCount>
                </div>

                <Button
                  iconOnly
                  variant="ghost"
                  className="size-7 rounded-full text-muted-foreground hover:text-foreground"
                >
                  <EllipsisVertical />
                </Button>
              </KanbanHeader>
              <KanbanContent container={container}>
                {/*
                  KanbanCardItem is imported from /components/kanban-card-item.
                  We must customize the contents of our kanban cards within '/components/kanban-card-item'. 
                  Additionally, you may want to update the KanbanContainer component in the kanban-column.tsx file.

                  The reason for this is that our Kanban context/dnd-kit context uses KanbanCardItem to render 
                  the overlay during drag-and-drop operations.

                  This approach ensures that the overlay accurately shows what's in the card when you move it. 
                  After trying different methods, this seems to be the best way to make the Kanban moveable 
                  component work smoothly. :)
                */}

                {container.items.length > 0 ? (
                  container.items.map((item) => (
                    <KanbanDraggable key={item.id} id={item.id}>
                      <KanbanCardItem
                        key={item.id}
                        itemId={item.id}
                        containerId={container.id}
                        {...(item as KanbanCardItemType)}
                      />
                    </KanbanDraggable>
                  ))
                ) : (
                  <div className="h-32">
                    <div
                      className="flex size-full flex-col items-center justify-center gap-3 rounded-medium px-4 py-2"
                      // custom dashed border-small styles
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23737373FF' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                        borderRadius: "6px",
                      }}
                    >
                      <span>
                        <StickyNoteIcon /> {/* custom Icon */}
                      </span>
                      <p className="text-small text-muted-foreground">
                        No tasks currently. Board is empty.
                      </p>
                    </div>
                  </div>
                )}
              </KanbanContent>
              <KanbanFooter>
                <button className="flex items-center gap-2 text-small text-muted-foreground">
                  <span>
                    <Plus className="size-5" />
                  </span>
                  Add a new Item
                </button>
              </KanbanFooter>
            </KanbanColumn>
          ))}
        </KanbanContainer>
      </Kanban>
    </div>
  )
}

export default KanbanExample

const StickyNoteIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <path
      d="M14.1495 6.66677L13.4471 9.33332M16.3988 3.68416C16.9509 4.65716 16.6232 5.90133 15.6668 6.46309C14.7104 7.02486 13.4874 6.69148 12.9352 5.71848C12.383 4.74548 12.7107 3.50131 13.6672 2.93954C14.6236 2.37778 15.8466 2.71116 16.3988 3.68416Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M17.3335 29.3307C16.0416 27.7567 14.0002 24 11.3335 24C9.61316 24.1412 8.71447 25.8148 7.79785 27.105M7.79785 27.105C7.26915 26.6147 7.07018 25.8835 6.67224 24.4211L4.34713 15.8765C3.41137 12.4377 2.94349 10.7183 3.7377 9.36371C4.53192 8.00914 6.27807 7.54843 9.77038 6.62699L12.6668 5.86277M7.79785 27.105C8.32656 27.5953 9.07972 27.7471 10.586 28.0506L16.1085 29.1634C17.2857 29.4006 17.2963 29.4003 18.457 29.094L22.2299 28.0986C25.7223 27.1771 27.4684 26.7164 28.2626 25.3618C29.0568 24.0073 28.589 22.2879 27.6532 18.849L25.3373 10.3383C24.4015 6.8995 23.9337 5.18008 22.558 4.39802C21.3596 3.71669 19.8799 3.97861 17.2094 4.66667"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)
