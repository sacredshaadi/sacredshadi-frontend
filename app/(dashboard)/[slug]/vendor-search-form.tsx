'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Trash } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '@/components/ui/use-toast';
import { budgetArr, fillerCities } from '@/constants/data';
import { DatePicker } from '@/app/_components/vendor-wrapper/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
// import FileUpload from '../file-upload';
// const ImgSchema = z.object({
//   fileName: z.string(),
//   name: z.string(),
//   fileSize: z.number(),
//   size: z.number(),
//   fileKey: z.string(),
//   key: z.string(),
//   fileUrl: z.string(),
//   url: z.string()
// });
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  location: z
    .string()
    .min(3, { message: 'Please select a venue from the dropdown' }),
  city: z.string().min(1, { message: 'Please select a city from the list' }),
  services: z
    .array(z.string())
    .min(1, { message: 'Please select atleast 1 service' }),
  budget: z.string(),
  date: z
    .date()
    .refine((date) => date >= new Date(), { message: 'Invalid date' })
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

enum locationEnum {
  myvenue = 'My Venue',
  studio = 'Studio'
}

export const SearchForm = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  // const title = initialData ? 'Edit product' : 'Create product';
  // const description = initialData ? 'Edit a product.' : 'Add a new product';
  // const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  // const action = initialData ? 'Save changes' : 'Create';

  // useEffect(() => {
  //   console.log('params: ', params, 'searchParams: ', searchParams.get('city'));
  // }, [params]);

  const defaultValues: ProductFormValues = {
    budget: '50,000',
    city: searchParams.get('city') || '',
    date: new Date(),
    location: locationEnum.myvenue,
    services: []
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log('data: ', data);

    // try {
    //   setLoading(true);
    //   if (initialData) {
    //     // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
    //   } else {
    //     // const res = await axios.post(`/api/products/create-product`, data);
    //     // console.log("product", res);
    //   }
    //   router.refresh();
    //   router.push(`/dashboard/products`);
    //   toast({
    //     variant: 'destructive',
    //     title: 'Uh oh! Something went wrong.',
    //     description: 'There was a problem with your request.'
    //   });
    // } catch (error: any) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Uh oh! Something went wrong.',
    //     description: 'There was a problem with your request.'
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  // const onDelete = async () => {
  //   try {
  //     setLoading(true);
  //     //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
  //     router.refresh();
  //     router.push(`/${params.storeId}/products`);
  //   } catch (error: any) {
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  // const triggerImgUrlValidation = () => form.trigger('imgUrl');

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        {/* <Heading title={title} description={description} /> */}
        {/* {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )} */}
      </div>
      {/* <Separator /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={defaultValues.location}
                    onValueChange={(value) => form.setValue('location', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={locationEnum.myvenue}>
                        {locationEnum.myvenue}
                      </SelectItem>
                      <SelectItem value={locationEnum.studio}>
                        {locationEnum.studio}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={defaultValues.city}
                      onValueChange={(value) => form.setValue('city', value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fillerCities.map((city) => (
                          <SelectItem value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={defaultValues.budget}
                      onValueChange={(value) => form.setValue('budget', value)}
                    >
                      <SelectTrigger className="">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetArr.map((budget) => (
                          <SelectItem value={budget}>{budget}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick a date for the event:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {/* {action} */}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
