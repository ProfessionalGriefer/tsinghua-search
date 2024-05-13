
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Course } from '@/lib/item';

import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//
//

const Cell = ({ accessorKey, header }: { accessorKey: string, header: string }): ColumnDef<Course> => (
  {
    accessorKey: accessorKey,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {header}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
);

export const columns: ColumnDef<Course>[] = [
  Cell({
    accessorKey: "title_en",
    header: "Title",
  }),
  Cell({
    accessorKey: "title_cn",
    header: "Title (Chinese)"
  }),
  Cell({
    accessorKey: "number",
    header: "Course number",
  }),
  Cell({
    accessorKey: "sequence",
    header: "Sequence",
  }),
  Cell({
    accessorKey: "credit",
    header: "Credits",
  }),
  Cell({
    accessorKey: "department",
    header: "Department"
  }),
  Cell({
    accessorKey: "instructor",
    header: "Instructor"
  }),
  Cell({
    accessorKey: "time",
    header: "Time",
  }),
  Cell({
    accessorKey: "features",
    header: "Features",
  }),
  Cell({
    accessorKey: "remarks",
    header: "Remarks",
  }),
];

