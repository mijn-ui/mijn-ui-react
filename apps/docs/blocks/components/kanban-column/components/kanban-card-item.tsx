import { UniqueIdentifier } from "@dnd-kit/core"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@mijn-ui/react"
import { Badge } from "@mijn-ui/react"
import { Progress } from "@mijn-ui/react"
import { X } from "lucide-react"
import { Icons } from "@/app/components/icons"
import { KanbanCard } from "../"
import { useKanban } from "./context"
import { KanbanCardItemType } from "./types"

type KanbanCardItemProps = {
  itemId: UniqueIdentifier | null
  containerId: UniqueIdentifier | null
} & Omit<KanbanCardItemType, "id">

const KanbanCardItem = ({
  itemId,
  containerId,
  title,
  tags,
  progress,
  status,
  users,
}: KanbanCardItemProps) => {
  const { deleteItem } = useKanban()

  const handleOnDelete = () => {
    if (!containerId || !itemId) return

    deleteItem(containerId, itemId)
  }

  return (
    <KanbanCard className="group relative w-full">
      <h5 className="w-10/12 text-small font-medium">{title}</h5>

      {tags?.map((tag: string) => (
        <div key={tag} className="flex flex-wrap">
          <Badge variant={"outlined"} className="px-2 py-0.5 text-tiny">
            {tag}
          </Badge>
        </div>
      ))}

      {progress && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-tiny text-muted-foreground">
            <h5>CheckList</h5>
            <p>3/4</p>
          </div>
          <Progress value={progress} />
        </div>
      )}

      <div className="flex w-full items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <Icons.clock className="size-5" />
            <span className="text-tiny">{status.createdAt}</span>
          </div>
          {status.comments && (
            <div className="flex items-center gap-1">
              <CommentIcon /> {/* customIcon */}
              <span className="text-tiny">2</span>
            </div>
          )}

          {status.attachment && (
            <div className="flex items-center gap-1">
              <StatusIcon /> {/* customIcon */}
              <span className="text-tiny">5</span>
            </div>
          )}
        </div>

        <AvatarGroup max={3} className="flex items-center justify-center">
          {users.map((user) => (
            <Avatar size={"xs"} key={user.name}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      <button
        onClick={handleOnDelete}
        className="absolute -right-2 -top-6 flex size-5 items-center justify-center rounded-full border-small border-border bg-card opacity-0 transition-opacity hover:brightness-90 group-hover:opacity-100"
      >
        <X size={12} />
      </button>
    </KanbanCard>
  )
}

const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M6.66634 11.25H13.333M6.66634 7.08333H9.99967"
      stroke="#404040"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.08218 15.8333C3.99875 15.7268 3.18713 15.4014 2.64281 14.857C1.6665 13.8807 1.6665 12.3094 1.6665 9.16668V8.75001C1.6665 5.60731 1.6665 4.03596 2.64281 3.05965C3.61913 2.08334 5.19047 2.08334 8.33317 2.08334H11.6665C14.8092 2.08334 16.3806 2.08334 17.3569 3.05965C18.3332 4.03596 18.3332 5.60731 18.3332 8.75001V9.16668C18.3332 12.3094 18.3332 13.8807 17.3569 14.857C16.3806 15.8333 14.8092 15.8333 11.6665 15.8333C11.1994 15.8438 10.8275 15.8793 10.462 15.9625C9.46336 16.1924 8.53861 16.7035 7.62473 17.1491C6.32258 17.784 5.6715 18.1015 5.26292 17.8043C4.48125 17.2221 5.24529 15.4182 5.4165 14.5833"
      stroke="#404040"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
)

const StatusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M6.6665 6.66708V5.00042C6.6665 3.15947 8.15889 1.66708 9.99984 1.66708C11.8408 1.66708 13.3332 3.15947 13.3332 5.00042V15.0004C13.3332 16.8414 11.8408 18.3338 9.99984 18.3338C8.15889 18.3338 6.6665 16.8414 6.6665 15.0004V11.2504C6.6665 10.0998 7.59924 9.16708 8.74984 9.16708C9.90043 9.16708 10.8332 10.0998 10.8332 11.2504V13.3338"
      stroke="#404040"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default KanbanCardItem
