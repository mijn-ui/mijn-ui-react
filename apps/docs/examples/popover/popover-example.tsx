import { Button } from "@mijn-ui/react"
import { Input } from "@mijn-ui/react"
import { Label } from "@mijn-ui/react"
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@mijn-ui/react"
import { RxCross2, RxMixerHorizontal } from "react-icons/rx"

// Making All of the Accordion Components Unstyled
type PopoverExampleProps = {
  unstyled?: boolean
}

const PopoverExample = ({ unstyled = false }: PopoverExampleProps) => {
  return (
    <Popover unstyled={unstyled}>
      <PopoverTrigger asChild>
        <Button iconOnly radius="full">
          <RxMixerHorizontal size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative w-72 ">
        <div className="flex flex-col justify-center gap-2.5">
          <p className="text-medium font-medium">Dimensions</p>

          <fieldset className="flex w-full items-center justify-between gap-2">
            <Label
              className="inline-block w-20 max-w-fit shrink-0 text-nowrap"
              htmlFor="width"
            >
              Width
            </Label>
            <Input
              className="h-8 bg-card p-1.5"
              classNames={{
                wrapper: "max-w-40",
                label: "bg-card peer-focus:bg-card",
              }}
              id="width"
              defaultValue="100%"
            />
          </fieldset>
          <fieldset className="flex w-full items-center justify-between gap-2">
            <Label
              className="inline-block w-20 max-w-fit shrink-0 text-nowrap"
              htmlFor="maxWidth"
            >
              Max. width
            </Label>
            <Input
              className="h-8 bg-card p-1.5"
              classNames={{
                wrapper: "max-w-40",
                label: "bg-card peer-focus:bg-card",
              }}
              id="maxWidth"
              defaultValue="300px"
            />
          </fieldset>
          <fieldset className="flex w-full items-center justify-between gap-2">
            <Label
              className="inline-block w-20 max-w-fit shrink-0 text-nowrap"
              htmlFor="height"
            >
              Height
            </Label>
            <Input
              className="h-8 bg-card p-1.5"
              classNames={{
                wrapper: "max-w-40",
                label: "bg-card peer-focus:bg-card",
              }}
              id="height"
              defaultValue="25px"
            />
          </fieldset>
          <fieldset className="flex w-full items-center justify-between gap-2">
            <Label
              className="inline-block w-20 max-w-fit shrink-0 text-nowrap"
              htmlFor="maxHeight"
            >
              Max. height
            </Label>
            <Input
              className="h-8 bg-card p-1.5"
              classNames={{
                wrapper: "max-w-40",
                label: "bg-card peer-focus:bg-card",
              }}
              id="maxHeight"
              defaultValue="none"
            />
          </fieldset>
        </div>
        <PopoverClose unstyled asChild>
          <Button
            variant="ghost"
            iconOnly
            radius={"full"}
            className="absolute right-0 top-0 hover:bg-transparent"
          >
            <RxCross2 />
          </Button>
        </PopoverClose>
        <PopoverArrow className="fill-muted-foreground" />
      </PopoverContent>
    </Popover>
  )
}

export default PopoverExample
