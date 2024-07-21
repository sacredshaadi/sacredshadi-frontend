"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

export type CellActionProps<T> = {
  data: T;
  editDataEndpoint: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

function CellAction<T = Record<string, any> & { id: number }>(props: CellActionProps<T>) {
  const [open, setOpen] = useState(false);

  const onConfirm = () => {};

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={false} />
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center hover:text-primary" onClick={props.onEditClick}>
          <Edit className="mr-2 h-4 w-4" /> Update
        </div>

        <div className="flex cursor-pointer items-center hover:text-primary" onClick={props.onDeleteClick}>
          <Trash className="mr-2 h-4 w-4" /> Delete
        </div>
      </div>
    </>
  );
}

export default CellAction;
