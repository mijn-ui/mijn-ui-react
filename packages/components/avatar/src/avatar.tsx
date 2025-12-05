"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { VariantProps, tv } from "tailwind-variants"

const avatarGroupStyles = tv({
  slots: {
    group: "flex items-center justify-center -space-x-[8%]",
    groupRemainChildren:
      "text-fg-secondary ml-3 flex items-center justify-center text-xs",
  },
})

const avatarStyles = tv({
  slots: {
    base: "relative flex shrink-0 items-center justify-center",
    image: "aspect-square size-full rounded-full object-cover",
    fallback:
      "border-outline-brand-subtle bg-bg-brand-subtle text-on-bg-brand-subtle flex size-full items-center justify-center rounded-full border font-medium leading-none",
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

/* -------------------------------------------------------------------------- */
/*                              AvatarContext                                  */
/* -------------------------------------------------------------------------- */

type AvatarBaseProps = UnstyledComponentWithSlots<AvatarSlots>

type AvatarContextType = AvatarBaseProps & {
  styles: ReturnType<typeof avatarStyles>
}

const [AvatarProvider, useAvatarContext] = createContext<AvatarContextType>({
  name: "AvatarContext",
  strict: true,
  errorMessage:
    "useAvatarContext: `context` is undefined. Seems you forgot to wrap component within <Avatar />",
})

/* -------------------------------------------------------------------------- */
/*                                 AvatarHook                                 */
/* -------------------------------------------------------------------------- */

const useAvatarStyles = (unstyledOverride?: boolean) => {
  const context = useAvatarContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                 AvatarGroup                                */
/* -------------------------------------------------------------------------- */

type AvatarGroupBaseProps = UnstyledComponentWithSlots<AvatarGroupSlots>

export type AvatarGroupProps = React.ComponentPropsWithRef<"div"> & {
  max?: number
} & AvatarGroupBaseProps

const AvatarGroup = ({
  max,
  children,
  classNames,
  className,
  unstyled = false,
  ...props
}: AvatarGroupProps) => {
  const { group, groupRemainChildren } = createTVUnstyledSlots(
    avatarGroupStyles(),
    unstyled,
  )
  const childArray = React.Children.toArray(children)
  const visibleChildren = max ? childArray.slice(0, max) : childArray
  const remainingChildrenCount = max ? childArray.length - max : 0

  return (
    <div
      data-slot="avatar-group"
      className={group({ className: cn(classNames?.group, className) })}
      {...props}
    >
      {visibleChildren}
      {remainingChildrenCount > 0 && (
        <span
          className={groupRemainChildren({
            className: classNames?.groupRemainChildren,
          })}
        >
          +{remainingChildrenCount}
        </span>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Avatar                                   */
/* -------------------------------------------------------------------------- */

export type AvatarProps = React.ComponentPropsWithRef<
  typeof AvatarPrimitive.Root
> &
  AvatarVariantProps &
  AvatarBaseProps

const Avatar = ({
  unstyled,
  size,
  className,
  classNames,
  ...props
}: AvatarProps) => {
  const styles = avatarStyles({ size })
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <AvatarProvider value={{ unstyled, styles, classNames }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </AvatarProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 AvatarImage                                */
/* -------------------------------------------------------------------------- */

type AvatarImageProps = React.ComponentPropsWithRef<
  typeof AvatarPrimitive.Image
> & { unstyled?: boolean }

const AvatarImage = ({ unstyled, className, ...props }: AvatarImageProps) => {
  const { image, classNames } = useAvatarStyles(unstyled)

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={image({
        className: cn(classNames?.image, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                               AvatarFallback                               */
/* -------------------------------------------------------------------------- */

export type AvatarFallbackProps = React.ComponentPropsWithRef<
  typeof AvatarPrimitive.Fallback
> & { unstyled?: boolean }

const AvatarFallback = ({
  unstyled,
  className,
  ...props
}: AvatarFallbackProps) => {
  const { fallback, classNames } = useAvatarStyles(unstyled)

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={fallback({
        className: cn(classNames?.fallback, className),
      })}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage, useAvatarStyles }
