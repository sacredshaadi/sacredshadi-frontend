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
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectGroup } from "@radix-ui/react-select";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display."
    })
    .email()
});

interface AddDialogProps {
  useMutation: () => UseMutationResult<any, Error, any, unknown>;
}

const formSchema = z.object({
  vendorTypeId: z.number().min(1, "Please select a service type"),
  description: z.string().min(1, "Please enter a description")
});

export function AddDialog(props: AddDialogProps) {
  const { vendor } = useUserStore();
  const [arr, setArr] = useState<any[]>([]);

  const { mutate: mutateFn, isPending, isError } = props.useMutation();

  type formType = z.infer<typeof formSchema>;
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      vendorTypeId: 0
    }
  });

  useEffect(() => {
    console.log("arr rendered again");
  }, [arr]);

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

  function onSubmit(data: formType) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new service type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="vendorTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      console.log("onchange: ", value, parseInt(value));
                      form.setValue("vendorTypeId", parseInt(value));
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {form.getValues("vendorTypeId") === 0
                            ? "Select a service type"
                            : arr.find((item) => item.id === form.getValues("vendorTypeId"))?.subType}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      className="flex max-h-60 w-full
                    flex-col gap-2 overflow-y-auto"
                    >
                      {isPending ? (
                        <ul className="flex flex-col gap-2">
                          {[1, 2, 3, 4].map((_, idx) => (
                            <Skeleton key={idx} className="h-6 w-full bg-gray-100" />
                          ))}
                        </ul>
                      ) : (
                        arr.map((item) => (
                          <SelectItem key={item.id} value={`${item.id}`} className="transition hover:bg-gray-100">
                            {item.subType}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
