"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  AvatarGroupSlots,
  AvatarSlots,
  AvatarVariantProps,
  UnstyledComponentWithSlots,
  UnstyledProps,
  avatarGroupStyles,
  avatarStyles,
  cn,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

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

type AvatarGroupProps = React.ComponentPropsWithRef<"div"> & {
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
> &
  UnstyledProps

const AvatarImage = ({ unstyled, className, ...props }: AvatarImageProps) => {
  const { image, classNames } = useAvatarStyles(unstyled)

  return (
    <AvatarPrimitive.Image
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

type AvatarFallbackProps = React.ComponentPropsWithRef<
  typeof AvatarPrimitive.Fallback
> &
  UnstyledProps

const AvatarFallback = ({
  unstyled,
  className,
  ...props
}: AvatarFallbackProps) => {
  const { fallback, classNames } = useAvatarStyles(unstyled)

  return (
    <AvatarPrimitive.Fallback
      className={fallback({
        className: cn(classNames?.fallback, className),
      })}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage }
