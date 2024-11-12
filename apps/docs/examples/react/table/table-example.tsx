import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@mijn-ui/components/table"
import { LuMoreHorizontal } from "react-icons/lu"

const TableExample = () => {
  return (
    <div className="overflow-auto rounded-xl border border-main-border">
      <Table>
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Date/Time</TableHeaderCell>
            <TableHeaderCell className="hidden sm:table-cell">
              Location
            </TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-surface">
          <TableRow>
            <TableCell>Alex Cooper</TableCell>
            <TableCell className="min-w-32">
              <p>Feb 17, 2024</p>
              <p className="text-xs text-disabled-text">08:48 AM</p>
            </TableCell>

            <TableCell className="hidden text-balance sm:table-cell">
              <p className="truncate md:w-44">123 Main Street, Anytown, USA</p>
            </TableCell>

            <TableCell>$1042.25</TableCell>

            <TableCell>
              <p className="flex items-center gap-2 text-xs text-neutral-text">
                <span
                  className={`block h-2 w-2 rounded-full bg-green-500 ring-2 ring-green-200`}
                />
                <span>Paid</span>
              </p>
            </TableCell>

            <TableCell>
              <LuMoreHorizontal />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Cameron Williamson</TableCell>

            <TableCell className="min-w-32">
              <p>Feb 17, 2024</p>
              <p className="text-xs text-disabled-text"> 08:48 AM</p>
            </TableCell>

            <TableCell className="hidden text-balance sm:table-cell">
              <p className="truncate md:w-44">456 Elm Avenue, Smallville, CA</p>
            </TableCell>

            <TableCell>$1042.25</TableCell>

            <TableCell>
              <p className="flex items-center gap-2 text-xs text-neutral-text">
                <span
                  className={`block h-2 w-2 rounded-full bg-yellow-500 ring-2 ring-yellow-200`}
                />
                <span>Pending</span>
              </p>
            </TableCell>

            <TableCell>
              <LuMoreHorizontal />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Lindsay Walton</TableCell>

            <TableCell className="min-w-32">
              <p>Feb 17, 2024</p>
              <p className="text-xs text-disabled-text"> 08:48 AM</p>
            </TableCell>

            <TableCell className="hidden text-balance sm:table-cell">
              <p className="truncate md:w-44">
                789 Maple Lane, Pleasantville, NY
              </p>
            </TableCell>

            <TableCell>$1042.25</TableCell>

            <TableCell>
              <p className="flex items-center gap-2 text-xs text-neutral-text">
                <span
                  className={`block h-2 w-2 rounded-full bg-green-500 ring-2 ring-green-200`}
                />
                <span>Paid</span>
              </p>
            </TableCell>

            <TableCell>
              <LuMoreHorizontal />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Leonard Krasner</TableCell>

            <TableCell className="min-w-32">
              <p>Feb 17, 2024</p>
              <p className="text-xs text-disabled-text"> 08:48 AM</p>
            </TableCell>

            <TableCell className="hidden text-balance sm:table-cell">
              <p className="truncate md:w-44">
                890 Birch Boulevard, Riverside, WA
              </p>
            </TableCell>

            <TableCell>$1042.25</TableCell>

            <TableCell>
              <p className="flex items-center gap-2 text-xs text-neutral-text">
                <span
                  className={`block h-2 w-2 rounded-full bg-red-500 ring-2 ring-red-200`}
                />
                <span>Returned</span>
              </p>
            </TableCell>
            <TableCell>
              <LuMoreHorizontal />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default TableExample