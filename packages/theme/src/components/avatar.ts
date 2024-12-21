import { tv, VariantProps } from "tailwind-variants"

const avatarGroupStyles = tv({
  slots: {
    group: "flex items-center justify-center -space-x-2",
    groupRemainChildren:
      "text-muted-text !ml-1.5 flex items-center justify-center text-xs",
  },
})

const avatarStyles = tv({
  slots: {
    base: "relative shrink-0 overflow-hidden rounded-full",
    image: "aspect-square size-full object-cover",
    fallback:
      "bg-muted flex size-full items-center justify-center rounded-full",
  },

  variants: {
    size: {
      xxl: "size-16 text-base",
      xl: "size-14 text-sm",
      lg: "size-12 text-sm",
      md: "size-10 text-sm",
      sm: "size-8 text-xs",
      xs: "size-6 text-xs",
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

export { avatarStyles, avatarGroupStyles }
