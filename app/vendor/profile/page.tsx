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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ContactDetails from "./contact-details";
import Introduction from "./introduction";
import SocialDetails from "./social-details";

const formSchema = z.object({
  details: z.string().min(3, { message: "Please select a venue from the dropdown" }),
  description: z.string().min(3, { message: "Please select a venue from the dropdown" }),
  facebookUrl: z.string().url({ message: "Please enter a valid URL" }),
  instagramUrl: z.string().url({ message: "Please enter a valid URL" }),
  twitterUrl: z.string().url({ message: "Please enter a valid URL" }),
  youtubeUrl: z.string().url({ message: "Please enter a valid URL" }),
  pinterestUrl: z.string().url({ message: "Please enter a valid URL" }),
  brandImage: z.string().url({ message: "Please enter a valid URL" })
});

type ProfileFormValues = z.infer<typeof formSchema>;

const Page = () => {
  const { vendor, setVendor } = useUserStore();
  const loadingRef = useRef<boolean>(false);

  const defaultValues: ProfileFormValues = {
    details: "",
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    pinterestUrl: "",
    brandImage: ""
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    if (!vendor) loadingRef.current = true;
    else loadingRef.current = false;
  }, [vendor]);

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
  };

  return (
    <VendorRouteWrapper title="Profile" currentStep={1}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <Button
              variant="default"
              size="sm"
              className="ml-auto mt-auto p-4 text-base font-semibold shadow-lg lg:p-6"
              type="submit"
            >
              Save Profile
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-8">
            <ContactDetails form={form} />
            <SocialDetails form={form} />
            <Introduction form={form} />
          </div>
        </form>
      </Form>
    </VendorRouteWrapper>
  );
};

export default Page;
