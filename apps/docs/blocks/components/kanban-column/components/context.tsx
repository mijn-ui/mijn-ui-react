import * as React from "react"
import { BaseKanbanContainer, BaseKanbanItem } from "./types"
import { useHandleDrag } from "./use-handle-drag"
import { findValueOfItems } from "./utils"
import { UniqueIdentifier } from "@dnd-kit/core"

type KanbanContextType<ItemType extends BaseKanbanItem> = {
  containers: BaseKanbanContainer<ItemType>[]
  setContainers: React.Dispatch<
    React.SetStateAction<BaseKanbanContainer<ItemType>[]>
  >
  activeId: UniqueIdentifier | null
  setActiveId: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>
  findActiveItem: (id: UniqueIdentifier | undefined) => ItemType | null
  deleteItem: (containerId: UniqueIdentifier, itemId: UniqueIdentifier) => void
} & ReturnType<typeof useHandleDrag>

// Provider props definition
export type KanbanProviderProps<ItemType extends BaseKanbanItem> = {
  value: BaseKanbanContainer<ItemType>[]
  setValue: React.Dispatch<
    React.SetStateAction<BaseKanbanContainer<ItemType>[]>
  >
  children: React.ReactNode
}

export const KanbanContext = React.createContext<
  /* eslint-disable-next-line */
  KanbanContextType<any> | undefined
>(undefined)

const KanbanProvider = <ItemType extends BaseKanbanItem>({
  children,
  value: containers,
  setValue: setContainers,
}: KanbanProviderProps<ItemType>) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  const drag = useHandleDrag({
    containers,
    setActiveId,
    setContainers,
  })

  const findActiveItem = (
    id: UniqueIdentifier | undefined,
  ): ItemType | null => {
    const container = findValueOfItems(containers, id, "item")
    if (!container) return null
    const item = container.items.find((item) => item.id === id)
    return item || null
  }

  const deleteItem = (
    containerId: UniqueIdentifier,
    itemId: UniqueIdentifier,
  ) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) => {
        if (container.id === containerId) {
          return {
            ...container,
            items: container.items.filter((item) => item.id !== itemId),
          }
        }
        return container
      }),
    )
  }

  return (
    <KanbanContext.Provider
      value={{
        ...drag,
        containers,
        setContainers,
        activeId,
        setActiveId,
        findActiveItem,
        deleteItem,
      }}
    >
      {children}
    </KanbanContext.Provider>
  )
}

const useKanban = <
  ItemType extends BaseKanbanItem,
>(): KanbanContextType<ItemType> => {
  const context = React.useContext(KanbanContext)
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider")
  }
  return context
}

export { KanbanProvider, useKanban }
