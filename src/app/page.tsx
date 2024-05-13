'use client';
import { useQuery } from '@tanstack/react-query';
import { queryData } from '@/lib/actions';
import { createFuse } from '@/lib/search';

import { columns } from "@/components/columns"
import { DataTable } from "@/components/table"
import Header from '@/components/header';

export default function Home() {
  const { data } = useQuery({ queryKey: ["query"], queryFn: () => queryData(), refetchOnWindowFocus: false });
  // let output;
  // if (data) {
  //   const fuse = createFuse(data);
  //   output = fuse.search("consulting").slice(0, 10);
  // }

  console.log("Data: ", data);
  return (
    // <div className="container mx-auto">
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="container mx-auto">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  )
}
