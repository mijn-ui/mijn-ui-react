"use client"

import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationList,
  PaginationNextButton,
  PaginationNextEllipsis,
  PaginationPreviousButton,
  PaginationPreviousEllipsis,
} from "@mijn-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PaginationExample = () => {
  const [currentPage, setCurrentPage] = React.useState(7)

  const ItemsPerPage = 10
  const TotalPage = 160

  return (
    <Pagination
      totalPages={TotalPage}
      currentPage={currentPage}
      itemsPerPage={ItemsPerPage}
      onChangePage={setCurrentPage}
    >
      <PaginationContent>
        <PaginationPreviousButton className="h-9 sm:h-10">
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </PaginationPreviousButton>
        <PaginationPreviousEllipsis />
        {/* you can customize the style of the button using css selectors */}
        <PaginationList className="[&>li>button]:size-9 sm:[&>li>button]:size-10" />
        <PaginationNextEllipsis className="[&>svg]:size-3.5 sm:[&>svg]:size-4" />
        <PaginationNextButton className="h-9 sm:h-10">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-4" />
        </PaginationNextButton>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationExample
