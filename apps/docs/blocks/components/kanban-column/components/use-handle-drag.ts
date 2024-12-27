import { BaseKanbanContainer, BaseKanbanItem } from "./types"
import { findValueOfItems } from "./utils"
import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

type UseHandleDragProps<ItemType extends BaseKanbanItem> = {
  containers: BaseKanbanContainer<ItemType>[]
  setContainers: React.Dispatch<
    React.SetStateAction<BaseKanbanContainer<ItemType>[]>
  >
  setActiveId: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>
}

export const useHandleDrag = <ItemType extends BaseKanbanItem>({
  containers,
  setContainers,
  setActiveId,
}: UseHandleDragProps<ItemType>) => {
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event

    if (!active || !over || active.id === over.id) return

    handleItemMove(active.id, over.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active || !over || active.id === over.id) return

    handleItemMove(active.id, over.id)

    setActiveId(null)
  }

  const handleItemMove = (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
  ) => {
    const activeContainer = findValueOfItems(containers, activeId, "item")
    const overContainer = findValueOfItems(containers, overId, "item")

    if (!activeContainer || !overContainer) return

    const activeContainerIndex = containers.findIndex(
      (container) => container.id === activeContainer.id,
    )
    const overContainerIndex = containers.findIndex(
      (container) => container.id === overContainer.id,
    )

    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === activeId,
    )
    const overItemIndex = overContainer.items.findIndex(
      (item) => item.id === overId,
    )

    const newContainers = [...containers]

    if (activeContainerIndex === overContainerIndex) {
      newContainers[activeContainerIndex]!.items = arrayMove(
        newContainers[activeContainerIndex]!.items,
        activeItemIndex,
        overItemIndex,
      )
    } else {
      const [movedItem] = newContainers[activeContainerIndex]!.items.splice(
        activeItemIndex,
        1,
      )
      newContainers[overContainerIndex]!.items.splice(
        overItemIndex,
        0,
        movedItem!,
      )
    }

    setContainers(newContainers)
  }

  return { handleDragStart, handleDragMove, handleDragEnd }
}
