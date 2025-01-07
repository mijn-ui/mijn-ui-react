import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import {
  Pagination,
  PaginationContent,
  PaginationList,
  PaginationNextButton,
  PaginationNextEllipsis,
  PaginationPreviousButton,
  PaginationPreviousEllipsis,
  PaginationProps,
} from "./pagination"

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  args: {
    currentPage: 7,
    itemsPerPage: 10,
    totalPages: 160,
    unstyled: false,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

const PaginationTemplate = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = React.useState(args.currentPage)

  return (
    <Pagination
      totalPages={args.totalPages}
      currentPage={currentPage}
      itemsPerPage={args.itemsPerPage}
      onChangePage={setCurrentPage}
      unstyled={args.unstyled}
    >
      <PaginationContent>
        <PaginationPreviousButton className="h-9 sm:h-10">
          <LuChevronLeft className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </PaginationPreviousButton>
        <PaginationPreviousEllipsis />
        <PaginationList className="[&>li>button]:size-9 sm:[&>li>button]:size-10" />
        <PaginationNextEllipsis className="[&>svg]:size-3.5 sm:[&>svg]:size-4" />
        <PaginationNextButton className="h-9 sm:h-10">
          <span className="hidden sm:inline">Next</span>
          <LuChevronRight className="size-4" />
        </PaginationNextButton>
      </PaginationContent>
    </Pagination>
  )
}

const PaginationUnstyled = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = React.useState(args.currentPage)

  return (
    <Pagination
      totalPages={args.totalPages}
      currentPage={currentPage}
      itemsPerPage={args.itemsPerPage}
      onChangePage={setCurrentPage}
      unstyled={args.unstyled}
    >
      <PaginationContent className="flex items-center gap-2">
        <PaginationPreviousButton className="flex h-9 items-center gap-2 sm:h-10">
          <LuChevronLeft className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </PaginationPreviousButton>
        <PaginationPreviousEllipsis />
        <PaginationList className="flex items-center gap-2 [&>li>button]:size-9 sm:[&>li>button]:size-10" />
        <PaginationNextEllipsis className="[&>svg]:size-3.5 sm:[&>svg]:size-4" />
        <PaginationNextButton className="flex h-9 items-center gap-2 sm:h-10">
          <span className="hidden sm:inline">Next</span>
          <LuChevronRight className="size-4" />
        </PaginationNextButton>
      </PaginationContent>
    </Pagination>
  )
}

export const Default: Story = {
  render: (args: PaginationProps) => <PaginationTemplate {...args} />,
}

export const Unstyled: Story = {
  render: (args: PaginationProps) => <PaginationUnstyled {...args} />,
  args: {
    unstyled: true,
  },
}
