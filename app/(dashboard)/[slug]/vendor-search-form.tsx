"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { budgetArr, fillerCities } from "@/constants/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const IMG_MAX_LIMIT = 3;

const formSchema = z.object({
  location: z.string().min(3, { message: "Please select a venue from the dropdown" }),
  city: z.string().min(1, { message: "Please select a city from the list" }),
  services: z.array(z.string()).min(1, { message: "Please select atleast 1 service" }),
  budget: z.string(),
  date: z.date().refine((date) => date >= new Date(), { message: "Invalid date" })
});

type ProductFormValues = z.infer<typeof formSchema>;

enum locationEnum {
  myvenue = "My Venue",
  studio = "Studio"
}

export const SearchForm = () => {
  const searchParams = useSearchParams();
  const [loading] = useState(false);

  const defaultValues: ProductFormValues = {
    budget: "50,000",
    city: searchParams.get("city") || "",
    date: new Date(),
    location: locationEnum.myvenue,
    services: []
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    // console.log("data: ", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select
                  defaultValue={defaultValues.location}
                  onValueChange={(value) => form.setValue("location", value)}
                >
                  <SelectTrigger className="w-[180px]">
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
        <div className="gap-8 md:grid md:grid-cols-3">
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select defaultValue={defaultValues.city} onValueChange={(value) => form.setValue("city", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fillerCities.map((city) => (
                        <SelectItem value={city} key={city}>
                          {city}
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
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Select defaultValue={defaultValues.budget} onValueChange={(value) => form.setValue("budget", value)}>
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
              <FormItem className="flex flex-col">
                <FormLabel>Pick a date for the event:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
          Submit
        </Button>
      </form>
    </Form>
  );
};
