"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useUserStore } from "@/app/context/user-context";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";

const Page = () => {
  const { vendor, setVendor } = useUserStore();
  const loadingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!vendor) loadingRef.current = true;
    else loadingRef.current = false;
  }, [vendor]);

  return (
    <VendorRouteWrapper title="Profile" currentStep={1}>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="text-2xl">
              {// the initials of the name
              vendor?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Button variant="secondary" size="sm" className="absolute bottom-0 right-0 rounded-full">
            <CameraIcon className="h-4 w-4" />
            <span className="sr-only">Upload profile image</span>
          </Button>
        </div>

        <div className="grid gap-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold">{vendor?.name}</h1>
        </div>

        <Button variant="default" size="sm" className="ml-auto mt-auto p-4 text-base font-semibold lg:p-6">
          Save Profile
        </Button>
      </div>

      <Separator className="my-8" />

      <div className="grid gap-8">
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled
                id="email"
                type="email"
                value={vendor?.email}
                defaultValue="catherine@acme.com"
                onChange={(e) => vendor && setVendor({ ...vendor, email: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={vendor?.phone} disabled />
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">Introduction</h2>
          <Textarea
            rows={2}
            value={vendor?.description}
            onChange={(e) => vendor && setVendor({ ...vendor, description: e.target.value })}
          />
        </div>
      </div>
    </VendorRouteWrapper>
  );
};

export default Page;
