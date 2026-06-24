"use client"

import * as React from "react"
import { cn } from "@mijn-ui/react-core"

/* -------------------------------------------------------------------------- */
/*                                 Breadcrumb                                 */
/* -------------------------------------------------------------------------- */

export type BreadcrumbProps = React.ComponentPropsWithRef<"nav">

const Breadcrumb = ({ ...props }: BreadcrumbProps) => (
  <nav data-slot="breadcrumb" aria-label="breadcrumb" {...props} />
)

/* -------------------------------------------------------------------------- */
/*                               BreadcrumbList                               */
/* -------------------------------------------------------------------------- */

export type BreadcrumbListProps = React.ComponentPropsWithRef<"ol">

const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => (
  <ol
    data-slot="breadcrumb-list"
    className={cn(
      "flex flex-wrap items-center gap-1.5 text-sm text-fg-secondary sm:gap-2.5",
      className,
    )}
    {...props}
  />
)

/* -------------------------------------------------------------------------- */
/*                               BreadcrumbItem                               */
/* -------------------------------------------------------------------------- */

export type BreadcrumbItemProps = React.ComponentPropsWithRef<"li">

const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => (
  <li
    data-slot="breadcrumb-item"
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
)

/* -------------------------------------------------------------------------- */
/*                               BreadcrumbLink                               */
/* -------------------------------------------------------------------------- */

export type BreadcrumbLinkProps = React.ComponentPropsWithRef<"a">

const BreadcrumbLink = ({ className, ...props }: BreadcrumbLinkProps) => (
  <a
    data-slot="breadcrumb-link"
    className={cn(
      "text-fg-secondary transition-colors duration-200 hover:text-fg-primary",
      className,
    )}
    {...props}
  />
)

/* -------------------------------------------------------------------------- */
/*                               BreadcrumbPage                               */
/* -------------------------------------------------------------------------- */

export type BreadcrumbPageProps = React.ComponentPropsWithRef<"span">

const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-current="page"
    aria-disabled="true"
    className={cn("font-medium text-fg-primary", className)}
    {...props}
  />
)

/* -------------------------------------------------------------------------- */
/*                            BreadcrumbSeparator                             */
/* -------------------------------------------------------------------------- */

export type BreadcrumbSeparatorProps = React.ComponentPropsWithRef<"li">

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    className={cn("text-fg-tertiary [&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )}
  </li>
)

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
