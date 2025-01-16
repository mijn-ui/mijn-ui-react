"use client"

import * as React from "react"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  PaginationSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
  cn,
  paginationStyles,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import { EllipsisIcon } from "@mijn-ui/shared-icons"

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

export type PaginationContentProps = React.ComponentPropsWithRef<"nav"> &
  UnstyledProps

const PaginationContent = ({
  className,
  unstyled,
  ...props
}: PaginationContentProps) => {
  const { content, classNames } = usePaginationStyles(unstyled)

  return (
    <nav
      className={content({ className: cn(classNames?.content, className) })}
      {...props}
    />
  )
}

export type PaginationListProps = React.ComponentProps<"ul"> & UnstyledProps

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
      className={list({ className: cn(classNames?.list, className) })}
      {...props}
    >
      {paginationRange.map((page, index) => (
        <li key={index} onClick={() => setPage(page)}>
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

type PaginationPreviousButtonProps = React.ComponentProps<"button"> &
  UnstyledProps

const PaginationPreviousButton = ({
  className,
  unstyled,
  ...props
}: PaginationPreviousButtonProps) => {
  const { goToPreviousPage } = usePaginationContext()
  const { previousBtn, classNames } = usePaginationStyles(unstyled)

  return (
    <button
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

export type PaginationNextButtonProps = React.ComponentProps<"button"> &
  UnstyledProps

const PaginationNextButton = ({
  className,
  unstyled,
  ...props
}: PaginationNextButtonProps) => {
  const { goToNextPage } = usePaginationContext()
  const { nextBtn, classNames } = usePaginationStyles(unstyled)

  return (
    <button
      onClick={goToNextPage}
      className={nextBtn({ className: cn(classNames?.nextBtn, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                         PaginationPreviousEllipsis                         */
/* -------------------------------------------------------------------------- */

type PaginationPreviousEllipsisProps = React.ComponentProps<"span"> &
  UnstyledProps

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

export type PaginationNextEllipsisProps = React.ComponentProps<"span"> &
  UnstyledProps

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
