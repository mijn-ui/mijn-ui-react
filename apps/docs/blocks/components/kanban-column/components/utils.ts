import { UniqueIdentifier } from "@dnd-kit/core"
import { BaseKanbanContainer, BaseKanbanItem } from "./types"

export const findValueOfItems = <ItemType extends BaseKanbanItem>(
  containers: BaseKanbanContainer<ItemType>[],
  id: UniqueIdentifier | undefined,
  type: string,
): BaseKanbanContainer<ItemType> | undefined => {
  if (type === "container") {
    return containers.find((item) => item.id === id)
  }
  if (type === "item") {
    return containers.find((container) =>
      container.items.find((item) => item.id === id),
    )
  }
  return
}
