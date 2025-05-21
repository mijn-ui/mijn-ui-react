import { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

const cardStyles = tv({
  slots: {
    base: "bg-card text-card-foreground rounded-large shadow-small",
    header: "flex flex-col space-y-1.5 p-4",
    content: "p-4 pt-0",
    footer: "flex items-center p-4 pt-0",
    title: "text-2xl font-semibold leading-none tracking-tight",
    description: "text-muted-foreground text-small",
  },
})

export type CardVariantProps = VariantProps<typeof cardStyles>
export type CardSlots = keyof ReturnType<typeof cardStyles>

export { cardStyles }
