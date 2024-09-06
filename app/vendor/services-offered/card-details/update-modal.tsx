"use client";

import React, { useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useUpdateOfferMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useVendorContext } from "@/app/context/vendor-context";

const formSchema = z.object({
  description: z.string().min(1, "Please enter a valid description"),
  details: z.string().min(1, "Please enter a valid description"),
  price: z.number().positive("Please enter a valid price")
});

interface ServiceTypeUpdateModalProps {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceTypeUpdateModal = (props: ServiceTypeUpdateModalProps) => {
  const { vendor, setVendor } = useUserStore();
  const { servicesOffered, setServicesOffered } = useVendorContext();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "",
      description: "",
      price: 0
    }
  });

  const { mutate: updateFn, isPending, isError } = useUpdateOfferMutation();

  const onSubmit = useCallback(
    (formData: z.infer<typeof formSchema>) => {
      if (!vendor?.tokens.accessToken) {
        throw new Error("No access token found");
      }
      try {
        updateFn(
          {
            accessToken: vendor.tokens.accessToken,
            data: { id: props.id, ...formData }
          },
          {
            onSuccess(data) {
              setServicesOffered([...servicesOffered.filter((item) => item.id !== props.id), data.data[1][0]]);
            },
            onError(error: any) {
              toast({
                variant: "destructive",
                description: error.message || error.error || "Error updating service package"
              });
              throw error;
            }
          }
        );
        props.setOpen(false);
      } catch (err: any) {
        const desc: string = err.message || err.error || "Error updating service package";
        if (desc.includes("token expired") || desc === "No access token found") {
          setVendor(null);
          router.push;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger
        className="flex h-fit items-center justify-center rounded-full bg-primary p-2 text-white"
        title="Update"
        onClick={() => {
          props.setOpen(true);
        }}
      >
        <Edit className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new service type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the price of the service package"
                      disabled={isPending}
                      onChange={(e) => {
                        form.setValue("price", parseInt(e.target.value));
                      }}
                      // {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <Textarea
                    {...field}
                    // className="input"
                    placeholder="Enter details about the service package offered"
                  />
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
                    // className="input"
                    placeholder="Give description of the service package offered"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && !isError && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceTypeUpdateModal;
