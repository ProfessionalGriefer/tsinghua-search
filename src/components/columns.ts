
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Course } from '@/lib/item';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title_en",
    header: "Title",
  },
  {
    accessorKey: "title_cn",
    header: "Title (Chinese)"
  },
]

