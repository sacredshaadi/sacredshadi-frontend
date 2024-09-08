"use client";

import * as z from "zod";
import { MouseEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { budgetArr } from "@/constants/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useVendorContext } from "@/app/context/vendor-context";
import useStateRef from "react-usestateref";
import MultipleSelectorComp from "@/app/_components/vendor-wrapper/multi-select-comp";
import { Option } from "@/components/ui/multiselect";
import { Skeleton } from "@/components/ui/skeleton";
import { useVendorSearch } from "@/hooks/useVendorSearch";

export const IMG_MAX_LIMIT = 3;

const formSchema = z.object({
  location: z.string().min(3, { message: "Please select a venue from the dropdown" }),
  cityId: z.number().min(1, { message: "Please select a valid city from the dropdown" }),
  services: z.array(z.number()).min(1, { message: "Please select atleast 1 service" }),
  budget: z.number(),
  date: z.date().refine((date) => date >= new Date(), { message: "Invalid date" })
});

type ProductFormValues = z.infer<typeof formSchema>;

enum locationEnum {
  myvenue = "My Venue",
  studio = "Studio"
}

interface Props {
  vendorTypeId: number;
}

export const SearchForm = (props: Props) => {
  const searchParams = useSearchParams();
  const { cities, vendorTypes } = useVendorContext();
  const [arr, setArr] = useState<Option[]>([]);
  const { onFormSubmit, isPending } = useVendorSearch();

  const [selected, setSelected] = useState<Option[]>([]);
  const [_, setCityId, cityIdRef] = useStateRef<number | null>(null);

  const [vendorSubTypesLoading, setVendorSubTypesLoading] = useState(true);

  useEffect(() => {
    const vendorType = vendorTypes.find((item) => item.id === props.vendorTypeId);
    setArr(
      () =>
        vendorType?.vendorSubTypes.map((item) => ({ label: item.subType, value: item?.id?.toString() }) as Option) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorTypes]);

  useEffect(() => {
    if (arr.length === 0) return;
    setVendorSubTypesLoading(false);
  }, [arr]);

  useEffect(() => {
    if (!searchParams.get("city")) {
      setCityId(1);
      form.setValue("cityId", 1);
      return;
    }
    const id = Number(searchParams.get("city"));
    setCityId(id);
    form.setValue("cityId", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  const defaultValues: ProductFormValues = {
    budget: 50000,
    cityId: 1,
    date: new Date(),
    location: locationEnum.myvenue,
    services: []
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {};

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue(
      "services",
      selected.map((item) => Number(item.value))
    );
    const formValues = form.getValues();
    onFormSubmit({
      cityId: formValues.cityId,
      serviceIds: selected.map((item) => Number(item.value)),
      priceRange: [0, formValues.budget],
      date: formValues.date,
      rating: 5
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select
                  defaultValue={defaultValues.location}
                  onValueChange={(value) => form.setValue("location", value)}
                >
                  <SelectTrigger className="">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={locationEnum.myvenue}>{locationEnum.myvenue}</SelectItem>
                    <SelectItem value={locationEnum.studio}>{locationEnum.studio}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="cityId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    form.setValue("cityId", Number(value));
                    setCityId(Number(value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {cities.find((city) => city.id === cityIdRef.current)?.name || "Select a city"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem value={`${city.id}`} key={city.id}>
                        {city.name}
                      </SelectItem>
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
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select services</FormLabel>
              {vendorSubTypesLoading ? (
                <Skeleton className="h-10 w-full bg-muted" />
              ) : (
                <MultipleSelectorComp arr={selected} setArr={setSelected} defaultOptions={arr} />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid-cols-1 gap-8 md:grid lg:grid-cols-2">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={defaultValues.budget.toString()}
                    onValueChange={(value) => form.setValue("budget", parseInt(value, 10))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetArr.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
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
              <FormItem>
                <FormLabel>Pick a date for the event:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={cn("w-full", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
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

        <div className="flex w-full items-center justify-end">
          <Button disabled={isPending} className="ml-auto px-10 font-semibold" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
