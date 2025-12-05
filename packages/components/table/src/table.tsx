"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"

const tableStyles = tv({
  slots: {
    base: "relative text-sm",
    header: "h-11 bg-bg-secondary",
    body: "bg-bg-default-alt divide-outline-default [&>tr:hover]:bg-bg-secondary divide-y",
    footer: "border-t-outline-default border-t font-medium",
    row: "border-outline-default border-b text-left",
    headerCell: "px-4 py-3 font-semibold",
    cell: "px-4 py-2 align-middle",
    caption: "text-fg-tertiary mt-4 text-sm",
  },
})

export type TableVariantProps = VariantProps<typeof tableStyles>
export type TableSlots = keyof ReturnType<typeof tableStyles>

export { tableStyles }

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
        data-slot="table"
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </TableProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 TableHeader                                */
/* -------------------------------------------------------------------------- */
export type TableHeaderProps = React.ComponentPropsWithRef<"thead"> & {
  unstyled?: boolean
}

const TableHeader = ({ className, unstyled, ...props }: TableHeaderProps) => {
  const { header, classNames } = useTableStyles(unstyled)

  return (
    <thead
      data-slot="table-header"
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

export type TableBodyProps = React.ComponentPropsWithRef<"tbody"> & {
  unstyled?: boolean
}

const TableBody = ({ className, unstyled, ...props }: TableBodyProps) => {
  const { body, classNames } = useTableStyles(unstyled)

  return (
    <tbody
      data-slot="table-body"
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

export type TableFooterProps = React.ComponentPropsWithRef<"tfoot"> & {
  unstyled?: boolean
}

const TableFooter = ({ className, unstyled, ...props }: TableFooterProps) => {
  const { footer, classNames } = useTableStyles(unstyled)

  return (
    <tfoot
      data-slot="table-footer"
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

export type TableRowProps = React.ComponentPropsWithRef<"tr"> & {
  unstyled?: boolean
}

const TableRow = ({ className, unstyled, ...props }: TableRowProps) => {
  const { row, classNames } = useTableStyles(unstyled)

  return (
    <tr
      data-slot="table-row"
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

export type TableHeaderCellProps = React.ComponentPropsWithRef<"th"> & {
  unstyled?: boolean
}

const TableHeaderCell = ({
  className,
  unstyled,
  ...props
}: TableHeaderCellProps) => {
  const { headerCell, classNames } = useTableStyles(unstyled)

  return (
    <th
      data-slot="table-header-cell"
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

export type TableCellProps = React.ComponentPropsWithRef<"td"> & {
  unstyled?: boolean
}

const TableCell = ({ className, unstyled, ...props }: TableCellProps) => {
  const { cell, classNames } = useTableStyles(unstyled)

  return (
    <td
      data-slot="table-cell"
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

export type TableCaptionProps = React.ComponentPropsWithRef<"caption"> & {
  unstyled?: boolean
}

const TableCaption = ({ className, unstyled, ...props }: TableCaptionProps) => {
  const { caption, classNames } = useTableStyles(unstyled)

  return (
    <caption
      data-slot="table-caption"
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
