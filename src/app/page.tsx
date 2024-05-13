'use client';
import { useQuery } from '@tanstack/react-query';

import { columns } from "@/components/columns"
import { DataTable } from "@/components/table"

export default function Home() {
  const { data } = useQuery({ queryKey: ["query"], queryFn: () => fetch("/output.json").then(res => res.json()), refetchOnWindowFocus: false });

  return (
    // <div className="container mx-auto">
    <div className="flex min-h-screen w-full flex-col ">
      <div className="container mx-auto top-16">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  )
}
