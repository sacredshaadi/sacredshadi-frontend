"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./actions";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo } from "react";

export type TableHocProps<T> = {
  editDataEndpoint: string;
  deleteDataEndpoint: string;
  paginateDataEndpoint: string;
  columns: ColumnDef<T>[];
  tableTitle: string;
  tableDescription?: string;
};

function TableHOC<T = Record<string, any> & { id: number }>(props: TableHocProps<T>) {
  const router = useRouter();
  const columns: ColumnDef<T>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false
      },
      ...props.columns,
      {
        id: "actions",
        cell: ({ row }) => (
          <CellAction
            data={row.original}
            editDataEndpoint={props.editDataEndpoint}
            deleteDataEndpoint={props.deleteDataEndpoint}
          />
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.editDataEndpoint]
  );

  return (
    <div className="bg-white p-2 shadow-md sm:p-4">
      <div className="flex items-start justify-between">
        <Heading title={props.tableTitle} description={props.tableDescription || ""} />
        <Button className="text-xs md:text-sm" onClick={() => router.push(`/dashboard/user/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator className="my-2" />

      <DataTable columns={columns} data={[]} searchKey="type" />
    </div>
  );
}

export default TableHOC;
