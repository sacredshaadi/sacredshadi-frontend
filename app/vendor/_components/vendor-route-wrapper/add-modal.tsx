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
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectItem } from "@radix-ui/react-select";
import { useUserStore } from "@/app/context/user-context";
import { UseMutationResult } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Control, FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

interface AddDialogProps {
  useMutation: () => UseMutationResult<any, Error, any, unknown>;
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters")
  // vendorTypeId: z.number().min(1, "Please select a service type"),
  // description: z.string().min(1, "Please enter a description")
});

const getForm = ({ form }: { form: any }) => (
  <Form {...form}>
    <form
    // onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* <section className="flex flex-col gap-4"> */}
      {/* <FormField
      name="vendorTypeId"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                console.log("value: ", value, parseInt(value));
                form.setValue("vendorTypeId", parseInt(value));
              }}
            >
              <SelectTrigger className="">
                <SelectValue>{form.getValues().vendorTypeId}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="grid grid-cols-1 gap-2">
                  {isPending ? (
                    [1, 2, 3, 4].map((_, idx) => (
                      <SelectItem value={`${idx}`}>
                        <Skeleton key={idx} className="h-6 w-full bg-gray-100" />
                      </SelectItem>
                    ))
                  ) : arr.length > 0 ? (
                    arr.map((item) => (
                      <SelectItem key={item.id} value={item.id} className=" hover:bg-gray-100">
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}

      <FormField
        control={form.control}
        name="vendorTypeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Select
                // defaultValue={defaultValues.location}
                onValueChange={(value) => {
                  console.log("value: ", value);
                  field.onChange(value);
                }}
                value={`${field.value}`}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{field.value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"23"}>{23}</SelectItem>
                  <SelectItem value={"33"}>{33}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Textarea rows={2} placeholder="Description" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* </section> */}
      <DialogFooter>
        <Button
          type="submit"
          className="font-semibold"
          // disabled={isPending || isError || arr.length === 0}
        >
          Add
        </Button>
      </DialogFooter>
    </form>
  </Form>
);

// export function AddDialog(props: AddDialogProps) {
//   const { vendor } = useUserStore();
//   const [arr, setArr] = useState<any[]>([]);

//   const { mutate: mutateFn, isPending, isError } = props.useMutation();

//   type formType = z.infer<typeof formSchema>;

//   // const form = useForm<formType>({
//   //   resolver: zodResolver(formSchema),
//   //   defaultValues: {
//   //     description: "",
//   //     vendorTypeId: 0
//   //   }
//   // });

//   useEffect(() => {
//     console.log("arr rendered again");
//   }, [arr]);

//   useEffect(() => {
//     // console.log("vendorType id: ", vendor?.vendorType?.id);

//     mutateFn(vendor?.vendorType?.id, {
//       onSuccess: (data) => {
//         console.log(data.data);

//         setArr(() => data.data);
//       },
//       onError: (err) => {
//         console.error(err);
//         toast({
//           variant: "destructive",
//           description: "Error fetching data"
//         });
//       }
//     });
//   }, []);

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const values = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
//     const { success, data, error } = formSchema.safeParse(values);
//     if (!success || (error as any)?.errors.length > 0) {
//       toast({
//         variant: "destructive",
//         title: "Could not create account",
//         description: <ul>{error?.errors.map((err, idx) => <li key={idx}>{err.message}</li>)}</ul>
//       });
//       return;
//     }
//     console.log("data: ", data);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default" className="ml-auto font-semibold">
//           <span className="flex items-center justify-center gap-2">
//             <Plus size={16} />
//             Add new
//           </span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add new service type</DialogTitle>
//         </DialogHeader>
//         {/* <form onSubmit={onSubmit} className="w-full space-y-4">
//           <div className="space-y-2">
//             <label>Name</label> */}
//             <Select
//               required
//               name="vendorTypeId"
//               onValueChange={(value) => {
//                 console.log("value: ", value);
//                 // form.setValue("vendorTypeId", parseInt(value
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue  placeholder="this is placeholder" />
//               </SelectTrigger>
//               <SelectContent>
//                 {/* {arr.map((item) => ( */}
//                 <SelectItem key={2} value={"val1"}>
//                   {"val1"}
//                 </SelectItem>
//                 <SelectItem key={3} value={"val2"}>
//                   {"val2"}
//                 </SelectItem>
//                 {/* // ))} */}
//               </SelectContent>
//             </Select>
//           {/* </div>

//           <div className="space-y-2">
//             <label>Email</label>
//             <Textarea required name="description" placeholder="Enter description here" />
//           </div>

//           <Button className="ml-auto w-full" type="submit">
//             Create Account
//           </Button>
//         </form> */}
//       </DialogContent>
//     </Dialog>
//   );
// }
export const AddDialog = (props: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SignupFormField name="email" label="Email" placeholder="Email" inputType="email" formControl={form.control} />
        <SignupFormField
          name="username"
          label="Username"
          placeholder="Username"
          description="At least 3 characters."
          formControl={form.control}
        />
        <SignupFormField
          name="password"
          label="Password"
          placeholder="Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <Button type="submit">Signup</Button>
      </form>
    </Form>
  );
};

interface SignupFormFieldProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
}

const SignupFormField: React.FC<SignupFormFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                console.log("value: ", value);
                field.onChange(value);
              }}
              value={`${field.value}`}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>{field.value}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"23"}>{23}</SelectItem>
                <SelectItem value={"33"}>{33}</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
