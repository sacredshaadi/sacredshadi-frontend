"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

export type CellActionProps<T> = {
  data: T;
  onEditClick: () => void;
  handleDelete: () => void;
};

function CellAction<T = Record<string, any> & { id: number }>(props: CellActionProps<T>) {
  const [open, setOpen] = useState(false);

  const onDeleteClick = () => setOpen(true);

  const onConfirmDelete = () => {
    props.handleDelete();
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirmDelete}
        loading={false}
        okText="Delete"
        title="Are you sure you want to delete this ?"
      />
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center hover:text-primary" onClick={props.onEditClick}>
          <Edit className="mr-2 h-4 w-4" /> Update
        </div>

        <div className="flex cursor-pointer items-center hover:text-primary" onClick={onDeleteClick}>
          <Trash className="mr-2 h-4 w-4" /> Delete
        </div>
      </div>
    </>
  );
}

export default CellAction;
