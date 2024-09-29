"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
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
import { FormImageUploader } from "@/components/ui/imageUploader";
import { ServiceOffered } from "@/types/auth.types";

const formSchema = z.object({
  description: z.string().min(1, "Please enter a valid description"),
  details: z.string().min(1, "Please enter a valid description"),
  price: z.number().positive("Please enter a valid price"),
  image: z.string().url().min(1, "Please upload an image")
});

interface ServiceTypeUpdateModalProps {
  id: number;
  open: boolean;
  offerObj: ServiceOffered;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ServiceTypeUpdateModal = (props: ServiceTypeUpdateModalProps) => {
  const { vendor, setVendor } = useUserStore();
  const { servicesOffered, setServicesOffered } = useVendorContext();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: props.offerObj.price,
      image: props.offerObj.image,
      details: props.offerObj.details,
      description: props.offerObj.description
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
          { accessToken: vendor.tokens.accessToken, data: { id: props.id, ...formData } },
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
        title="Update"
        onClick={() => props.setOpen(true)}
        className="flex h-fit items-center justify-center rounded-full bg-primary p-2 text-white shadow-xl"
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
                  <FormLabel className="font-semibold text-muted-foreground">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="Enter the price of the service package"
                      onChange={(e) => form.setValue("price", parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FormImageUploader
                      defaultValue={field.value}
                      setFormValue={(value) => form.setValue("image", value)}
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
                  <FormLabel className="font-semibold text-muted-foreground">Details</FormLabel>
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
                  <FormLabel className="font-semibold text-muted-foreground">Description</FormLabel>
                  <Textarea
                    {...field}
                    // className="input"
                    placeholder="Give description of the service package offered"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="font-semibold shadow-lg">
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
