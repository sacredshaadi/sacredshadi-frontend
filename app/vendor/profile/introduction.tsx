"use client";

// import { useUserStore } from "@/app/context/user-context";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { Form, UseFormReturn } from "react-hook-form";

interface IntroductionProps {
  form: UseFormReturn<
    {
      details: string;
      description: string;
      facebookUrl?: string | undefined;
      instagramUrl?: string | undefined;
      twitterUrl?: string | undefined;
      youtubeUrl?: string | undefined;
      pinterestUrl?: string | undefined;
      coverImage?: string | undefined;
    },
    any,
    undefined
  >;
}

const Introduction = (props: IntroductionProps) => {
  // const { vendor, setVendor } = useUserStore();
  return (
    <div className="grid gap-2">
      <FormField
        control={props.form.control}
        name="details"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="text-lg font-semibold !text-black">Introduction</FormLabel>
            <FormControl>
              <Textarea {...field} rows={2} placeholder="Write a detailed introduction about yourself" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h2 className="text-lg font-semibold"></h2>
    </div>
  );
};

export default Introduction;
