"use client";

import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { FormEvent, useMemo, useState } from "react";

import CellAction from "./actions";
import useTableHocQuery from "./query";
import { userAuthTypes } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { FormElementInstance, FormRenderer } from "../forms";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export type TableHocProps<T> = {
  addDataEndpoint: string;
  editDataEndpoint: string;
  deleteDataEndpoint: string;
  paginateDataEndpoint: string;
  createDataTransformer?: (data: any) => any;
  editDataTransformer?: (data: any) => any;
  columns: ColumnDef<T>[];
  addModalTitle?: string;
  updateModalTitle?: string;
  addEditFormMeta: FormElementInstance[];
};

function TableHOC<T = Record<string, any> & { id: number }>(props: TableHocProps<T>) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<T | null>(null);

  const { data, handleAddData, handleEditData, refetchData, isFetchingData, handleDeleteData } = useTableHocQuery({
    type: userAuthTypes.super_admin,
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
            handleDelete={() => handleDeleteData((row.original as any).id)}
          />
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.editDataEndpoint, props.deleteDataEndpoint]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
      if (!!editData) {
        const data = { ...editData, ...((formData as any) || {}) };
        const transformedData = props.editDataTransformer ? props.editDataTransformer(data) : data;
        handleEditData(transformedData, {
          onSuccess: () => {
            toast({ title: "Updated Successfully", description: "" });
            setOpen(false);
            setEditData(null);
          },
          onError: (err: any) => {
            console.log(err);
            toast({ title: "Error", description: err.error });
          }
        });
      } else {
        const transformedData = props.createDataTransformer ? props.createDataTransformer(formData) : formData;
        handleAddData(transformedData, {
          onSuccess: () => {
            toast({ title: "Created Successfully", description: "" });
            setOpen(false);
            setEditData(null);
          },
          onError: (err: any) => {
            console.log(err);
            toast({ title: "Error", description: err.error });
          }
        });
      }
    } catch (err: any) {}
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
            <FormRenderer meta={props.addEditFormMeta} {...(!!editData ? { defaults: editData } : {})} />
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
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => refetchData()} disabled={isFetchingData}>
              <ReloadIcon className={cn(isFetchingData ? "animate-spin" : "")} />
            </Button>
            <Button
              className="text-xs md:text-sm"
              onClick={() => {
                setOpen(true);
                setEditData(null);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
        }
      />
    </>
  );
}

export default TableHOC;
