import * as React from "react"
import {
  KanbanProvider,
  KanbanProviderProps,
  useKanban,
} from "./components/context"
import KanbanCardItem from "./components/kanban-card-item"
import {
  BaseKanbanContainer,
  BaseKanbanItem,
  KanbanCardItemType,
} from "./components/types"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@mijn-ui/react-utilities"
import { LuGripVertical } from "react-icons/lu"

/* ------------------ make Kanban to be more user friendly ------------------ */

const Kanban = <ItemType extends BaseKanbanItem>({
  children,
  value,
  setValue,
}: KanbanProviderProps<ItemType>) => {
  return (
    <KanbanProvider value={value} setValue={setValue}>
      {children}
    </KanbanProvider>
  )
}

const KanbanContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const { handleDragStart, handleDragMove, handleDragEnd } = useKanban()

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center gap-4",
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>

      <KanbanOverlay />
    </DndContext>
  )
})

KanbanContainer.displayName = "KanbanContainer"

const KanbanOverlay = () => {
  const { activeId, findActiveItem } = useKanban()

  if (!activeId) return

  const item = findActiveItem(activeId) as unknown as Omit<
    KanbanCardItemType,
    "id"
  >

  return (
    <DragOverlay adjustScale={false}>
      <KanbanCardItem itemId={activeId} containerId={null} {...item} />
    </DragOverlay>
  )
}

const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-auto rounded-2xl bg-kanban py-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

KanbanColumn.displayName = "KanbanColumn"

type KanbanContentProps<ItemType extends BaseKanbanItem> =
  React.ComponentProps<"div"> & {
    container: BaseKanbanContainer<ItemType>
  }

const KanbanContent = React.forwardRef<
  HTMLDivElement,
  KanbanContentProps<BaseKanbanItem>
>(
  <ItemType extends BaseKanbanItem>(
    { container, children, className, ...props }: KanbanContentProps<ItemType>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <SortableContext items={container.items?.map((i) => i.id)}>
        <div
          ref={ref}
          className={cn("space-y-4 px-4 py-2", className)}
          {...props}
        >
          {children}
        </div>
      </SortableContext>
    )
  },
)

KanbanContent.displayName = "KanbanContent"

type KanbanDraggableProps = {
  id: UniqueIdentifier
} & Omit<React.ComponentProps<"div">, "id">

const KanbanDraggable = ({
  id,
  className,
  children,
  ...props
}: KanbanDraggableProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(
        "group relative w-full touch-none",
        isDragging && "opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <button
        {...listeners}
        className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-md border border-main-border transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
      >
        <LuGripVertical size={16} />
      </button>
    </div>
  )
}

const KanbanCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "w-full cursor-pointer space-y-4 rounded-lg bg-surface p-4",
      className,
    )}
    ref={ref}
    {...props}
  />
))

KanbanCard.displayName = "KanbanCard"

const KanbanHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between px-3 py-2",
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})

KanbanHeader.displayName = "KanbanHeader"

const KanbanFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-4 px-4 py-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

KanbanFooter.displayName = "KanbanFooter"

const KanbanTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h3">
>(({ className, ...props }, ref) => {
  return (
    <h3 className={cn("text-lg font-medium", className)} ref={ref} {...props} />
  )
})

KanbanTitle.displayName = "KanbanTitle"

const KanbanItemCount = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "flex size-5 items-center justify-center rounded-full bg-surface text-xs font-medium text-muted-text",
        className,
      )}
      {...props}
    />
  )
})

KanbanItemCount.displayName = "KanbanItemCount"

export {
  Kanban,
  KanbanCard,
  KanbanColumn,
  KanbanContainer,
  KanbanContent,
  KanbanDraggable,
  KanbanFooter,
  KanbanHeader,
  KanbanItemCount,
  KanbanOverlay,
  KanbanTitle,
}
