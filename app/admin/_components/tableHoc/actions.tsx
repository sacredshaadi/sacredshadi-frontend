"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

export type CellActionProps<T> = {
  data: T;
  editDataEndpoint: string;
  deleteDataEndpoint: string;
};

function CellAction<T = Record<string, any> & { id: number }>(props: CellActionProps<T>) {
  const [open, setOpen] = useState(false);

  const onConfirm = () => {};

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={false} />
      <div className="">
        <Edit className="mr-2 h-4 w-4" /> Update
      </div>

      <div className="">
        <Trash className="mr-2 h-4 w-4" /> Delete
      </div>
    </>
  );
}

export default CellAction;
