import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const avatarGroupStyles = tv({
  slots: {
    group: "flex items-center justify-center -space-x-2",
    groupRemainChildren:
      "text-muted-foreground !ml-1.5 flex items-center justify-center text-tiny",
  },
})

const avatarStyles = tv({
  slots: {
    base: "inline-block relative shrink-0 overflow-hidden rounded-full",
    image: "aspect-square size-full object-cover",
    fallback:
      "bg-muted flex size-full items-center justify-center rounded-full",
  },

  variants: {
    size: {
      xxl: "size-16 text-medium",
      xl: "size-14 text-small",
      lg: "size-12 text-small",
      md: "size-10 text-small",
      sm: "size-8 text-tiny",
      xs: "size-6 text-tiny",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type AvatarVariantProps = VariantProps<typeof avatarStyles>
export type AvatarGroupVariantProps = VariantProps<typeof avatarGroupStyles>
export type AvatarGroupSlots = keyof ReturnType<typeof avatarGroupStyles>
export type AvatarSlots = keyof ReturnType<typeof avatarStyles>

export { avatarGroupStyles, avatarStyles }
