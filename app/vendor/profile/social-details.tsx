"use client";
import { useUserStore } from "@/app/context/user-context";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface ContactDetailsProps {
  form: any;
}

const SocialDetails = (props: ContactDetailsProps) => {
  const { vendor, setVendor } = useUserStore();

  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold">Social Profiles</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <FormField
            control={props.form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    value={vendor?.email}
                    defaultValue="catherine@acme.com"
                    onChange={(e) => vendor && setVendor({ ...vendor, email: e.target.value })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={vendor?.phone} disabled />
        </div>
      </div>
    </div>
  );
};

export default SocialDetails;
