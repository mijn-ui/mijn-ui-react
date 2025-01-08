import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@mijn-ui/react"

const DropdownMenuExample = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Edit</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Undo</DropdownMenuItem>
        <DropdownMenuItem disabled>Redo</DropdownMenuItem>
        <DropdownMenuItem>Cut</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Copy as
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Text</DropdownMenuItem>
              <DropdownMenuItem>Video</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Audio
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>png</DropdownMenuItem>
              <DropdownMenuItem>jpg</DropdownMenuItem>
              <DropdownMenuItem>svg</DropdownMenuItem>
              <DropdownMenuItem>gif</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>Audio</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Mail</DropdownMenuItem>
              <DropdownMenuItem>Instagram</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuExample
