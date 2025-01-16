"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  TableSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
  cn,
  tableStyles,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"

/* -------------------------------------------------------------------------- */
/*                                TableContext                                */
/* -------------------------------------------------------------------------- */

type TableBaseProps = UnstyledComponentWithSlots<TableSlots>

type TableContextType = TableBaseProps & {
  styles: ReturnType<typeof tableStyles>
}

const [TableProvider, useTableContext] = createContext<TableContextType>({
  name: "TableContext",
  strict: true,
  errorMessage:
    "useTableContext: `context` is undefined. Seems you forgot to wrap component within <Table />",
})

/* -------------------------------------------------------------------------- */
/*                                  TabelHook                                 */
/* -------------------------------------------------------------------------- */

const useTableStyles = (unstyledOverride?: boolean) => {
  const context = useTableContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                    Table                                   */
/* -------------------------------------------------------------------------- */

export type TableProps = React.ComponentPropsWithRef<"table"> & TableBaseProps

const Table = ({
  className,
  classNames,
  unstyled = false,
  ...props
}: TableProps) => {
  const styles = tableStyles()
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <TableProvider value={{ unstyled, styles, classNames }}>
      <table
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </TableProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 TableHeader                                */
/* -------------------------------------------------------------------------- */
export type TableHeaderProps = React.ComponentPropsWithRef<"thead"> &
  UnstyledProps

const TableHeader = ({ className, unstyled, ...props }: TableHeaderProps) => {
  const { header, classNames } = useTableStyles(unstyled)

  return (
    <thead
      className={header({
        className: cn(classNames?.header, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                  TableBody                                 */
/* -------------------------------------------------------------------------- */

export type TableBodyProps = React.ComponentPropsWithRef<"tbody"> &
  UnstyledProps

const TableBody = ({ className, unstyled, ...props }: TableBodyProps) => {
  const { body, classNames } = useTableStyles(unstyled)

  return (
    <tbody
      className={body({
        className: cn(classNames?.body, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 TableFooter                                */
/* -------------------------------------------------------------------------- */

export type TableFooterProps = React.ComponentPropsWithRef<"tfoot"> &
  UnstyledProps

const TableFooter = ({ className, unstyled, ...props }: TableFooterProps) => {
  const { footer, classNames } = useTableStyles(unstyled)

  return (
    <tfoot
      className={footer({
        className: cn(classNames?.footer, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                  TableRow                                  */
/* -------------------------------------------------------------------------- */

export type TableRowProps = React.ComponentPropsWithRef<"tr"> & UnstyledProps

const TableRow = ({ className, unstyled, ...props }: TableRowProps) => {
  const { row, classNames } = useTableStyles(unstyled)

  return (
    <tr
      className={row({
        className: cn(classNames?.row, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                               TableHeaderCell                              */
/* -------------------------------------------------------------------------- */

export type TableHeaderCellProps = React.ComponentPropsWithRef<"th"> &
  UnstyledProps

const TableHeaderCell = ({
  className,
  unstyled,
  ...props
}: TableHeaderCellProps) => {
  const { headerCell, classNames } = useTableStyles(unstyled)

  return (
    <th
      className={headerCell({
        className: cn(classNames?.headerCell, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                  TableCell                                 */
/* -------------------------------------------------------------------------- */

export type TableCellProps = React.ComponentPropsWithRef<"td"> & UnstyledProps

const TableCell = ({ className, unstyled, ...props }: TableCellProps) => {
  const { cell, classNames } = useTableStyles(unstyled)

  return (
    <td
      className={cell({
        className: cn(classNames?.cell, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                TableCaption                                */
/* -------------------------------------------------------------------------- */

export type TableCaptionProps = React.ComponentPropsWithRef<"caption"> &
  UnstyledProps

const TableCaption = ({ className, unstyled, ...props }: TableCaptionProps) => {
  const { caption, classNames } = useTableStyles(unstyled)

  return (
    <caption
      className={caption({
        className: cn(classNames?.caption, className),
      })}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useTableStyles,
}
