"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./actions";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import useTableHocQuery from "./query";
import { FormElementInstance, FormRenderer } from "../forms";

export type TableHocProps<T> = {
  addDataEndpoint: string;
  editDataEndpoint: string;
  deleteDataEndpoint: string;
  paginateDataEndpoint: string;
  columns: ColumnDef<T>[];
  addModalTitle?: string;
  updateModalTitle?: string;
  addEditFormMeta: FormElementInstance[];
};

function TableHOC<T = Record<string, any> & { id: number }>(props: TableHocProps<T>) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<T | null>(null);
  const { data } = useTableHocQuery({
    addDataEndpoint: props.addDataEndpoint,
    paginateDataEndpoint: props.paginateDataEndpoint,
    deleteDataEndpoint: props.deleteDataEndpoint,
    editDataEndpoint: props.editDataEndpoint
  });

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
        header: "Actions",
        cell: ({ row }) => (
          <CellAction
            data={row.original}
            onEditClick={() => {
              setEditData(row.original);
              setOpen(true);
            }}
            onDeleteClick={() => {
              // console.log("delete");
            }}
            editDataEndpoint={props.editDataEndpoint}
            // deleteDataEndpoint={props.deleteDataEndpoint}
          />
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.editDataEndpoint]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
    console.log(formData);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={!!editData ? props.updateModalTitle || `Update` : props.addModalTitle || `Add`}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-1">
            <FormRenderer meta={props.addEditFormMeta} />
          </div>

          <div className="flex items-center justify-between">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>

      <DataTable
        columns={columns}
        data={data ? data.data : []}
        searchKey="type"
        headingExtra={
          <Button
            className="text-xs md:text-sm"
            onClick={() => {
              setOpen(true);
              setEditData(null);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        }
      />
    </>
  );
}

export default TableHOC;
