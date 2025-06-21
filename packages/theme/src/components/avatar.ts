import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const avatarGroupStyles = tv({
  slots: {
    group: "flex items-center justify-center -space-x-2",
    groupRemainChildren:
      "text-secondary-foreground !ml-1.5 flex items-center justify-center text-xs",
  },
})

const avatarStyles = tv({
  slots: {
    base: "relative flex shrink-0 items-center justify-center",
    image: "aspect-square size-full rounded-full object-cover",
    fallback:
      "border-border-primary-subtle bg-primary-subtle text-primary-foreground-subtle flex size-full items-center justify-center rounded-full border font-medium leading-none",
  },
  variants: {
    size: {
      xl: "size-20 text-3xl",
      lg: "size-16 text-2xl",
      md: "size-14 text-xl",
      sm: "size-12 text-base",
      xs: "size-10 text-sm",
      "2xs": "size-8 text-xs",
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
