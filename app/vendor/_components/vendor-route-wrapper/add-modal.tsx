"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useUserStore } from "@/app/context/user-context";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectGroup } from "@radix-ui/react-select";
import { Vendor, VendorSubType } from "@/types/auth.types";
import MultipleSelectorComp from "@/app/_components/vendor-wrapper/multi-select-comp";
import { Option } from "@/components/ui/multiselect";

interface AddDialogProps {
  useMutation: () => UseMutationResult<any, Error, any, unknown>;
  submitMutation: () => UseMutationResult<any, Error, { accessToken: string; data: any }, unknown>;
}

const formSchema = z.object({
  vendorSubTypeIds: z.number().array().nonempty("Please select a service type"),
  description: z.string().min(1, "Please enter a description")
});

export function AddDialog(props: AddDialogProps) {
  const { vendor, setVendor } = useUserStore();
  const [arr, setArr] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option[]>(
    (vendor?.SelectedVendorSubTypes || []).map((item) => ({
      label: item.subType,
      value: item.id.toString()
    }))
  );
  const [open, setOpen] = useState(false);

  const { mutate: mutateFn, isPending, isError } = props.useMutation();
  const { mutate: submitFn, isPending: submitPending, isError: submitError } = props.submitMutation();

  type formType = z.infer<typeof formSchema>;
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: ""
    }
  });

  useEffect(() => {
    form.setValue("vendorSubTypeIds", selected.map((item) => parseInt(item.value)) as [number, ...number[]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    mutateFn(vendor?.vendorType?.id, {
      onSuccess: (data) => {
        const temp = data.data as VendorSubType[];
        setArr(() => temp.map((item) => ({ label: item.subType, value: item.id.toString() })));
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          description: "Error fetching data"
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(formData: formType) {
    try {
      submitFn(
        {
          accessToken: vendor?.tokens?.accessToken || "",
          data: {
            ids: formData.vendorSubTypeIds
          }
        },
        {
          onSuccess: (data) => {
            setVendor({
              ...vendor,
              SelectedVendorSubTypes: data.data as VendorSubType[]
            } as Vendor);
            // setVendor({
            //   ...vendor,
            //   SelectedVendorSubTypes: vendor?.SelectedVendorSubTypes.concat()
            // })
            toast({
              variant: "default",
              description: "Data submitted successfully"
            });
            // const temp = (vendor?.SelectedVendorSubTypes || []).concat({
            //   subType: arr.find((item) => item.id === formData.vendorSubTypeId)?.subType,
            //   vendorSubTypeId: formData.vendorSubTypeId
            // });
            // setVendor({
            //   ...(vendor as Vendor),
            //   SelectedVendorSubTypes: (vendor?.SelectedVendorSubTypes || []).concat({
            //     subType: arr.find((item) => item.id === formData.vendorSubTypeId)?.subType,
            //     vendorSubTypeId: formData.vendorSubTypeId
            //   })
            // });
            setOpen(false);
          },
          onError: (err) => {
            throw err;
          }
        }
      );
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.error || err.message || "Error submitting data"
      });
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-auto font-semibold">
          <span className="flex items-center justify-center gap-2">
            <Plus size={16} />
            Update services
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new service type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="vendorSubTypeIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <MultipleSelectorComp arr={selected} setArr={setSelected} defaultOptions={arr} />
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...field}
                    className="input"
                    placeholder="Enter description for your selected service type"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitPending}>
              {submitPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
