"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectItem } from "@radix-ui/react-select";
import { useUserStore } from "@/app/context/user-context";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

interface AddDialogProps {
  useMutation: () => UseMutationResult<any, Error, any, unknown>;
}

export function AddDialog(props: AddDialogProps) {
  const { vendor } = useUserStore();
  const [arr, setArr] = useState<any[]>([]);

  const { mutate: mutateFn, isPending, isError } = props.useMutation();

  useEffect(() => {
    // console.log("vendorType id: ", vendor?.vendorType?.id);

    mutateFn(vendor?.vendorType?.id, {
      onSuccess: (data) => {
        console.log(data.data);

        setArr(() => data.data);
      },
      onError: (err) => {
        console.error(err);
        toast({
          variant: "destructive",
          description: "Error fetching data"
        });
      }
    });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-auto font-semibold">
          <span className="flex items-center justify-center gap-2">
            <Plus size={16} />
            Add new
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new service type</DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-4">
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select a fruit"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="grid grid-cols-1 gap-2 p-2">
                {isPending ? (
                  [1, 2, 3, 4].map((_, idx) => (
                    <SelectItem value={`${idx}`}>
                      <Skeleton key={idx} className="h-6 w-full bg-gray-100" />
                    </SelectItem>
                  ))
                ) : arr.length > 0 ? (
                  arr.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.subType}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-data">
                    <span className="text-lg font-semibold text-gray-400">No services available</span>
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea rows={2} placeholder="Description" />
        </section>
        <DialogFooter>
          <Button type="submit" className="font-semibold" disabled={isPending || isError || arr.length === 0}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
