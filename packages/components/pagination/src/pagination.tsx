"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { EllipsisIcon } from "@mijn-ui/shared-icons"
import { VariantProps, tv } from "tailwind-variants"

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
          "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 focus-visible:ring-offset-2",
          "gap-0 px-0",
          "size-9",

          "bg-bg-secondary",
        ],
      },
      false: {
        listItem: [
          "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 focus-visible:ring-offset-2",
          "gap-0 px-0",
          "size-9",
          "text-fg-tertiary",
        ],
      },
    },
  },
  compoundSlots: [
    {
      slots: ["previousBtn", "nextBtn"],
      class: [
        "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-bg-default-alt text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 shadow-xs border focus-visible:ring-offset-2",
        "h-8 rounded-md px-3",
      ],
    },
    {
      slots: ["previousElipsis", "nextElipsis"],
      class:
        "text-fg-tertiary flex size-8 items-center justify-center [&_svg]:size-4",
    },
  ],
})

export type PaginationVariantProps = VariantProps<typeof paginationStyles>
export type PaginationSlots = keyof ReturnType<typeof paginationStyles>
export { paginationStyles }

/* -------------------------------------------------------------------------- */
/*                              PaginationContext                             */
/* -------------------------------------------------------------------------- */

type PaginationBaseProps = UnstyledComponentWithSlots<PaginationSlots>

type PaginationContextType = PaginationBaseProps & {
  styles: ReturnType<typeof paginationStyles>
  paginationRange: number[]
  currentPage: number
  prevEllipsisActive: boolean
  nextEllipsisActive: boolean
  setPage: (page: number) => void
  goToPreviousPage: () => void
  goToNextPage: () => void
}

const [PaginationProvider, usePaginationContext] =
  createContext<PaginationContextType>({
    name: "PaginationContext",
    strict: true,
    errorMessage:
      "usePaginationContext: `context` is undefined. Seems you forgot to wrap component within <Pagination />",
  })

/* -------------------------------------------------------------------------- */
/*                             usePagination Hook                            */
/* -------------------------------------------------------------------------- */

type usePaginationProps = {
  totalPages: number
  itemsPerPage: number
  currentPage: number
}

const usePaginationRange = ({
  totalPages,
  itemsPerPage,
  currentPage,
}: usePaginationProps) => {
  const totalPageCount = Math.ceil(totalPages / itemsPerPage)
  const visiblePages = 3

  if (totalPageCount <= visiblePages) {
    return {
      range: Array.from({ length: totalPageCount }, (_, i) => i + 1),
      prevEllipsisActive: false,
      nextEllipsisActive: false,
    }
  }

  if (currentPage <= 2) {
    return {
      range: [1, 2, 3],
      prevEllipsisActive: false,
      nextEllipsisActive: totalPageCount > 3,
    }
  }

  if (currentPage >= totalPageCount - 1) {
    return {
      range: [totalPageCount - 2, totalPageCount - 1, totalPageCount],
      prevEllipsisActive: totalPageCount > 3,
      nextEllipsisActive: false,
    }
  }

  const leftBound = currentPage - 1
  const rightBound = currentPage + 1

  const range = Array.from(
    { length: rightBound - leftBound + 1 },
    (_, i) => i + leftBound,
  )

  return {
    range,
    prevEllipsisActive: leftBound > 1,
    nextEllipsisActive: rightBound < totalPageCount,
  }
}

/* -------------------------------------------------------------------------- */
/*                               PaginationHook                               */
/* -------------------------------------------------------------------------- */
const usePaginationStyles = (unstyledOverride?: boolean) => {
  const context = usePaginationContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                 Pagination                                 */
/* -------------------------------------------------------------------------- */

export type PaginationProps = {
  totalPages: number
  itemsPerPage: number
  children: React.ReactNode
  currentPage?: number // Controlled state
  onChangePage?: (page: number) => void // Callback for controlled state
} & PaginationBaseProps

const Pagination: React.FC<PaginationProps> = ({
  unstyled = false,
  totalPages,
  itemsPerPage,
  children,
  currentPage: propsCurrentPage,
  onChangePage,
  classNames,
}) => {
  const [internalCurrentPage, setInternalCurrentPage] =
    React.useState<number>(1)

  const isControlled = propsCurrentPage !== undefined
  const currentPage = isControlled ? propsCurrentPage : internalCurrentPage

  const paginationRange = usePaginationRange({
    currentPage,
    itemsPerPage,
    totalPages,
  })

  const setPage = (page: number) => {
    if (isControlled && onChangePage) {
      onChangePage(page)
    } else {
      setInternalCurrentPage(page)
    }
  }

  const goToPreviousPage = () => setPage(Math.max(currentPage - 1, 1))

  const goToNextPage = () =>
    setPage(Math.min(currentPage + 1, Math.ceil(totalPages / itemsPerPage)))

  React.useEffect(() => {
    if (!isControlled && propsCurrentPage !== undefined) {
      setInternalCurrentPage(propsCurrentPage)
    }
  }, [propsCurrentPage, isControlled])

  const styles = paginationStyles()

  return (
    <PaginationProvider
      value={{
        unstyled,
        styles,
        classNames,
        paginationRange: paginationRange.range,
        prevEllipsisActive: paginationRange.prevEllipsisActive,
        nextEllipsisActive: paginationRange.nextEllipsisActive,
        currentPage,
        setPage,
        goToPreviousPage,
        goToNextPage,
      }}
    >
      {children}
    </PaginationProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                              PaginationContent                             */
/* -------------------------------------------------------------------------- */

export type PaginationContentProps = React.ComponentPropsWithRef<"nav"> & {
  unstyled?: boolean
}

const PaginationContent = ({
  className,
  unstyled,
  ...props
}: PaginationContentProps) => {
  const { content, classNames } = usePaginationStyles(unstyled)

  return (
    <nav
      data-slot="pagination-content"
      className={content({ className: cn(classNames?.content, className) })}
      {...props}
    />
  )
}

export type PaginationListProps = React.ComponentProps<"ul"> & {
  unstyled?: boolean
}

/* -------------------------------------------------------------------------- */
/*                               PaginationList                               */
/* -------------------------------------------------------------------------- */

const PaginationList = ({
  className,
  unstyled,
  ...props
}: PaginationListProps) => {
  const { currentPage, setPage, paginationRange } = usePaginationContext()
  const { list, listItem, classNames } = usePaginationStyles(unstyled)

  return (
    <ul
      data-slot="pagination-list"
      className={list({ className: cn(classNames?.list, className) })}
      {...props}
    >
      {paginationRange.map((page, index) => (
        <li
          data-slot="pagination-list-item"
          key={index}
          onClick={() => setPage(page)}
        >
          <button
            className={listItem({
              active: currentPage === page,
              className: classNames?.listItem,
            })}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/*                          PaginationPreviousButton                          */
/* -------------------------------------------------------------------------- */

type PaginationPreviousButtonProps = React.ComponentProps<"button"> & {
  unstyled?: boolean
}

const PaginationPreviousButton = ({
  className,
  unstyled,
  ...props
}: PaginationPreviousButtonProps) => {
  const { goToPreviousPage } = usePaginationContext()
  const { previousBtn, classNames } = usePaginationStyles(unstyled)

  return (
    <button
      data-slot="pagination-previous-button"
      onClick={goToPreviousPage}
      className={previousBtn({
        className: cn(classNames?.previousBtn, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                            PaginationNextButton                            */
/* -------------------------------------------------------------------------- */

export type PaginationNextButtonProps = React.ComponentProps<"button"> & {
  unstyled?: boolean
}

const PaginationNextButton = ({
  className,
  unstyled,
  ...props
}: PaginationNextButtonProps) => {
  const { goToNextPage } = usePaginationContext()
  const { nextBtn, classNames } = usePaginationStyles(unstyled)

  return (
    <button
      data-slot="pagination-next-button"
      onClick={goToNextPage}
      className={nextBtn({ className: cn(classNames?.nextBtn, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                         PaginationPreviousEllipsis                         */
/* -------------------------------------------------------------------------- */

type PaginationPreviousEllipsisProps = React.ComponentProps<"span"> & {
  unstyled?: boolean
}

const PaginationPreviousEllipsis = ({
  className,
  unstyled,
  ...props
}: PaginationPreviousEllipsisProps) => {
  const { prevEllipsisActive } = usePaginationContext()
  const { previousElipsis, classNames } = usePaginationStyles(unstyled)

  if (!prevEllipsisActive) return null

  return (
    <span
      data-slot="pagination-previous-ellipsis"
      aria-hidden
      className={previousElipsis({
        className: cn(classNames?.previousElipsis, className),
      })}
      {...props}
    >
      <EllipsisIcon className="size-4" />
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*                           PaginationNextEllipsis                           */
/* -------------------------------------------------------------------------- */

export type PaginationNextEllipsisProps = React.ComponentProps<"span"> & {
  unstyled?: boolean
}

const PaginationNextEllipsis = ({
  className,
  unstyled,
  ...props
}: PaginationNextEllipsisProps) => {
  const { nextEllipsisActive } = usePaginationContext()
  const { nextElipsis, classNames } = usePaginationStyles(unstyled)

  if (!nextEllipsisActive) return null

  return (
    <span
      data-slot="pagination-next-ellipsis"
      aria-hidden
      className={nextElipsis({
        className: cn(classNames?.nextElipsis, className),
      })}
      {...props}
    >
      <EllipsisIcon className="size-4" />
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationList,
  PaginationNextButton,
  PaginationNextEllipsis,
  PaginationPreviousButton,
  PaginationPreviousEllipsis,
  usePaginationContext,
  usePaginationStyles,
}
