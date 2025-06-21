import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const paginationStyles = tv({
  slots: {
    base: "",
    content: "flex w-full items-center gap-4",
    list: "flex flex-row items-center",
    listItem: "",
    previousBtn: "",
    previousElipsis: "",
    nextBtn: "",
    nextElipsis: "",
  },
  variants: {
    active: {
      true: {
        listItem: [
          buttonStyles({
            variant: "ghost",
            iconOnly: true,
          }).base(),
          "bg-secondary",
        ],
      },
      false: {
        listItem: [
          buttonStyles({
            variant: "ghost",
            iconOnly: true,
          }).base(),
          "text-muted-foreground",
        ],
      },
    },
  },
  compoundSlots: [
    {
      slots: ["previousBtn", "nextBtn"],
      class: buttonStyles({ size: "sm" }).base(),
    },
    {
      slots: ["previousElipsis", "nextElipsis"],
      class:
        "text-muted-foreground flex size-8 items-center justify-center [&_svg]:size-4",
    },
  ],
})

export type PaginationVariantProps = VariantProps<typeof paginationStyles>
export type PaginationSlots = keyof ReturnType<typeof paginationStyles>
export { paginationStyles }
