import { UniqueIdentifier } from "@dnd-kit/core"

// Base type for items, requiring an id
export type BaseKanbanItem = {
  id: UniqueIdentifier
  /* eslint-disable-next-line */
  [key: string]: any
}

// Base type for containers, requiring an id and items
export type BaseKanbanContainer<ItemType extends BaseKanbanItem> = {
  id: UniqueIdentifier
  title: string
  items: ItemType[]
}

// Kanban card item type
export type KanbanCardItemType = {
  id: UniqueIdentifier
  title: string
  tags?: Array<string>
  progress?: number
  status: {
    createdAt: string
    comments?: string
    attachment?: string
  }
  users: Array<{ name: string; avatar: string }>
}

// Kanban container type
export type KanbanContainerType = {
  id: UniqueIdentifier
  title: string
  items: KanbanCardItemType[]
}
