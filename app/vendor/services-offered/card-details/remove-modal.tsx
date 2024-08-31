"use client";

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Loader2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRemoveOfferMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface ServiceTypeRemoveModalProps {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceTypeRemoveModal = (props: ServiceTypeRemoveModalProps) => {
  const { mutate: removeFn, isPending, isError } = useRemoveOfferMutation();
  const { vendor, setVendor } = useUserStore();
  const router = useRouter();
  const submit = useCallback(() => {
    if (!vendor?.tokens.accessToken) {
      throw new Error("No access token found");
    }
    try {
      removeFn(
        {
          accessToken: vendor.tokens.accessToken,
          data: { id: props.id }
        },
        {
          onSuccess(data) {
            console.log("onSuccess removed ", data);
          },
          onError(error: any) {
            toast({
              variant: "destructive",
              description: error.message || error.error || "Error removing service package"
            });
            throw error;
          }
        }
      );
      props.setOpen(false);
    } catch (err: any) {
      const desc: string = err.message || err.error || "Error removing service package";
      if (desc.includes("token expired") || desc === "No access token found") {
        setVendor(null);
        router.push;
      }
    }
  }, [removeFn]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger
        className="flex h-fit items-center justify-center rounded-full bg-primary p-2 text-white"
        title="Remove"
        onClick={() => props.setOpen(true)}
      >
        <DeleteIcon className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this service package from your profile.
          </DialogDescription>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="default" className="font-semibold" disabled={isPending} onClick={submit}>
              {isPending && !isError && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Yes, remove</span>
            </Button>
            <DialogClose asChild>
              <Button variant="secondary" className="font-semibold" disabled={isPending}>
                No, keep
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceTypeRemoveModal;
