"use client"

import * as React from "react"
import { Popover, PopoverAnchor, PopoverContent } from "@mijn-ui/react-popover"
import { cn, createContext, mergeRefs } from "@mijn-ui/react-utilities"
import {
  UnstyledComponentWithSlots,
  UnstyledProps,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { Command as CommandPrimitive } from "cmdk"
import { CheckIcon } from "@mijn-ui/shared-icons"
import { AutocompleteSlots, autocompleteStyles } from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"

type AutocompleteBaseProps = UnstyledComponentWithSlots<AutocompleteSlots>

type AutocompleteContextType = {
  styles: ReturnType<typeof autocompleteStyles>

  onValueChange: (value: string) => void
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputRef: React.RefObject<HTMLInputElement | null>
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedValue: string
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>

  handleSelectOption: (value: string) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  handleBlur: () => void

  setShouldFilter: React.Dispatch<React.SetStateAction<boolean>>
} & AutocompleteBaseProps

const [AutocompleteProvider, useAutocompleteContext] =
  createContext<AutocompleteContextType>({
    name: "AutocompleteContext",
    strict: true,
    errorMessage:
      "useAutocompleteContext: `context` is undefined. Seems you forgot to wrap component within <Autocomplete />",
  })

/* -------------------------------------------------------------------------- */
/*                              AutocompleteHook                              */
/* -------------------------------------------------------------------------- */

const useAutocompleteStyles = (unstyledOverride?: boolean) => {
  const context = useAutocompleteContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                Autocomplete                                */
/* -------------------------------------------------------------------------- */

export type AutocompleteProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
> & {
  value: string
  onValueChange: (value: string) => void
} & AutocompleteBaseProps

const Autocomplete = ({
  className,
  classNames,
  unstyled = false,
  value,
  onValueChange,
  children,
  ...props
}: AutocompleteProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [isOpen, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string>(value || "")
  const [inputValue, setInputValue] = React.useState<string>("")
  const [shouldFilter, setShouldFilter] = React.useState(false)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (!input) {
      return
    }

    // Keep the options displayed when the user is typing
    if (!isOpen) {
      setOpen(true)
    }

    if (event.key === "Escape") {
      input.blur()
    }
  }

  const handleBlur = () => {
    setOpen(false)
    setInputValue(selectedValue)
    setShouldFilter(false)
  }

  const handleSelectOption = (value: string) => {
    setInputValue(value)
    setSelectedValue(value)
    onValueChange?.(value)

    // This is a hack to prevent the input from being focused after the user selects an option
    // We can call this hack: "The next tick"
    setTimeout(() => {
      inputRef?.current?.blur()
    }, 0)
  }

  const styles = autocompleteStyles()
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <AutocompleteProvider
      value={{
        unstyled,
        styles,
        classNames,

        isOpen,
        setOpen,

        onValueChange,

        inputValue,
        setInputValue,
        inputRef,

        handleBlur,
        handleKeyDown,
        handleSelectOption,
        selectedValue,
        setSelectedValue,
        setShouldFilter,
      }}
    >
      <Popover open={isOpen} onOpenChange={setOpen}>
        <CommandPrimitive
          shouldFilter={shouldFilter}
          onKeyDown={handleKeyDown}
          className={base({ className: cn(classNames?.base, className) })}
          {...props}
        >
          {children}
        </CommandPrimitive>
      </Popover>
    </AutocompleteProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                               AutocompleteTrigger                              */
/* -------------------------------------------------------------------------- */

type AutocompleteTriggerProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Input
> &
  UnstyledProps

const AutocompleteTrigger = ({
  unstyled,
  ref,
  className,
  ...props
}: AutocompleteTriggerProps) => {
  const {
    inputValue,
    inputRef,
    setInputValue,
    setOpen,
    handleBlur,
    setShouldFilter,
  } = useAutocompleteContext()
  const { trigger } = useAutocompleteStyles(unstyled)

  return (
    <PopoverAnchor asChild>
      <CommandPrimitive.Input
        ref={mergeRefs([inputRef, ref])}
        value={inputValue}
        onValueChange={(value) => {
          setInputValue(value)
          setShouldFilter(true)
        }}
        onBlur={handleBlur}
        onFocus={() => setOpen(true)}
        className={trigger({ className })}
        {...props}
      />
    </PopoverAnchor>
  )
}

/* -------------------------------------------------------------------------- */
/*                               AutocompleteContent                              */
/* -------------------------------------------------------------------------- */

type AutocompleteContentProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.List
> & {
  emptyMessage?: string
  loading?: boolean
} & UnstyledProps

const AutocompleteContent = ({
  unstyled,
  className,
  loading,
  emptyMessage,
  children,
  ...props
}: AutocompleteContentProps) => {
  const { isUnstyled, content, contentEmpty, skeleton, classNames } =
    useAutocompleteStyles(unstyled)

  return (
    <PopoverContent
      asChild
      onOpenAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => {
        if (
          e.target instanceof Element &&
          e.target.hasAttribute("cmdk-input")
        ) {
          e.preventDefault()
        }
      }}
      className={content({ className: cn(classNames?.content, className) })}
      unstyled={isUnstyled}
      // you can set this to true if you want to flip the content to flip when there isn't enough space for the comboBox content
      avoidCollisions={false}
      // to prevent scrolling issue when Popover inside Dialog
      // see: https://github.com/radix-ui/primitives/issues/1159
      onWheel={(e) => {
        e.stopPropagation()
      }}
    >
      <CommandPrimitive.List {...props}>
        {!loading && children}
        {!loading && (
          <CommandPrimitive.Empty
            className={contentEmpty({
              className: classNames?.contentEmpty,
            })}
          >
            {emptyMessage || "No Options Found"}
          </CommandPrimitive.Empty>
        )}
        {loading && (
          <CommandPrimitive.Loading>
            <div className={skeleton({ className: classNames?.skeleton })} />
          </CommandPrimitive.Loading>
        )}
      </CommandPrimitive.List>
    </PopoverContent>
  )
}

/* -------------------------------------------------------------------------- */
/*                              AutocompleteGroup                             */
/* -------------------------------------------------------------------------- */

type AutocompleteGroupProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Group
> &
  UnstyledProps

const AutocompleteGroup = ({
  unstyled,
  children,
  className,
  ...props
}: AutocompleteGroupProps) => {
  const { group, classNames } = useAutocompleteStyles(unstyled)

  return (
    <CommandPrimitive.Group
      className={group({ className: cn(classNames?.group, className) })}
      {...props}
    >
      {children}
    </CommandPrimitive.Group>
  )
}

/* -------------------------------------------------------------------------- */
/*                                AutocompleteItem                                */
/* -------------------------------------------------------------------------- */

type AutocompleteItemProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Item
> &
  UnstyledProps

const AutocompleteItem = ({
  unstyled,
  className,
  children,
  value,
  ...props
}: AutocompleteItemProps) => {
  const { selectedValue, handleSelectOption } = useAutocompleteContext()
  const { item, classNames } = useAutocompleteStyles(unstyled)
  const isSelected = selectedValue === value

  return (
    <CommandPrimitive.Item
      key={value}
      value={value}
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onSelect={handleSelectOption}
      className={item({
        className: cn(classNames?.item, className),
        selected: isSelected,
      })}
      {...props}
    >
      {children}
      {isSelected ? <CheckIcon /> : null}
    </CommandPrimitive.Item>
  )
}

export {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteTrigger,
}
