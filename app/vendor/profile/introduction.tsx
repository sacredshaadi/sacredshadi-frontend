"use client";

import { useUserStore } from "@/app/context/user-context";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface IntroductionProps {
  form: any;
}

const Introduction = (props: IntroductionProps) => {
  const { vendor, setVendor } = useUserStore();
  return (
    <div className="grid gap-2">
      <FormField
        control={props.form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Introduction</FormLabel>
            <FormControl>
              <Textarea
                rows={2}
                value={vendor?.description}
                onChange={(e) => vendor && setVendor({ ...vendor, description: e.target.value })}
              />
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
