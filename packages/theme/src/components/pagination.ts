import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const paginationStyles = tv({
  slots: {
    base: "",
    content: "flex items-center gap-2",
    list: "flex flex-row items-center gap-1",
    listItem: "",
    previousBtn: "",
    previousElipsis: "",
    nextBtn: "",
    nextElipsis: "",
  },
  variants: {
    active: {
      true: {
        listItem: buttonStyles({
          variant: "outlined",
          iconOnly: true,
        }).base(),
      },
      false: {
        listItem: buttonStyles({
          variant: "ghost",
          iconOnly: true,
        }).base(),
      },
    },
  },
  compoundSlots: [
    {
      slots: ["previousBtn", "nextBtn"],
      class: buttonStyles({
        variant: "ghost",

        size: "md",
        className: "gap-1 font-medium",
      }).base(),
    },
    {
      slots: ["previousElipsis", "nextElipsis"],
      class: "flex size-9 items-center justify-center [&_svg]:size-4",
    },
  ],
})

export type PaginationVariantProps = VariantProps<typeof paginationStyles>
export type PaginationSlots = keyof ReturnType<typeof paginationStyles>
export { paginationStyles }
