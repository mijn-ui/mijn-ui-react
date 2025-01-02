import { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

const cardStyles = tv({
  slots: {
    base: "bg-surface text-surface-text rounded-large shadow-small",
    header: "flex flex-col space-y-1.5 p-4",
    content: "p-4 pt-0",
    footer: "flex items-center p-4 pt-0",
    title: "text-2xl font-semibold leading-none tracking-tight",
    description: "text-muted-text text-small",
  },
})

export type CardVariantProps = VariantProps<typeof cardStyles>
export type CardSlots = keyof ReturnType<typeof cardStyles>

export { cardStyles }
