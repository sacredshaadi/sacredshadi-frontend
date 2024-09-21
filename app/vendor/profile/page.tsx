"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useUserStore } from "@/app/context/user-context";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ContactDetails from "./contact-details";
import Introduction from "./introduction";
import SocialDetails from "./social-details";
import { toast } from "@/components/ui/use-toast";
import { useUpdateVendorMutation } from "@/components/api";
import { useRouter } from "next/navigation";
import DndUploader from "@/app/_components/dnd-uploader";
import { Vendor } from "@/types/auth.types";
import { Input } from "@/components/ui/input";
import UplodedImages from "./album-wrapper/uploaded-images";

const formSchema = z.object({
  details: z.string().min(1, { message: "Please select a venue from the dropdown" }),
  description: z.string().min(3, { message: "Please write a detailed introduction" }),
  facebookUrl: z.string().url({ message: "Please enter a valid URL" }),
  instagramUrl: z.string().url({ message: "Please enter a valid URL" }),
  twitterUrl: z.string().url({ message: "Please enter a valid URL" }),
  youtubeUrl: z.string().url({ message: "Please enter a valid URL" }),
  pinterestUrl: z.string().url({ message: "Please enter a valid URL" })
});

type ProfileFormValues = z.infer<typeof formSchema>;

const Page = () => {
  const { vendor, setVendor } = useUserStore();
  const loadingRef = useRef<boolean>(false);
  const { mutate: updateFn, isPending, isError } = useUpdateVendorMutation();
  const router = useRouter();

  const defaultValues: ProfileFormValues = {
    details: "",
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    pinterestUrl: ""
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    if (!vendor) loadingRef.current = true;
    else loadingRef.current = false;
  }, [vendor]);

  useEffect(() => {
    if (!vendor) return;
    form.setValue("details", vendor.details || "");
    form.setValue("description", vendor.description || "");
    form.setValue("facebookUrl", vendor.socialMedia?.facebookUrl || "");
    form.setValue("instagramUrl", vendor.socialMedia?.instagramUrl || "");
    form.setValue("twitterUrl", vendor.socialMedia?.twitterUrl || "");
    form.setValue("youtubeUrl", vendor.socialMedia?.youtubeUrl || "");
    form.setValue("pinterestUrl", vendor.socialMedia?.pinterestUrl || "");
  }, [vendor]);

  const onSubmit = (data: ProfileFormValues) => {
    try {
      if (!vendor?.tokens.accessToken) throw new Error("No access token found");
      updateFn(
        { data, accessToken: vendor.tokens.accessToken },
        {
          onSuccess: (data: { data: Vendor; message: String }) => {
            toast({ title: "Success", description: data.message, variant: "default" });

            setVendor({
              ...vendor,
              details: data.data.details || "",
              description: data.data.description || "",
              socialMedia: data.data.socialMedia || {}
            });
            // setVendor((prev) => ({ ...prev, ...data.data }));
          },
          onError: (error) => {
            throw error;
          }
        }
      );
    } catch (err: any) {
      console.error(err);
      const msg: string = err.message || err.error || "An error occurred";
      toast({ title: "Error", description: msg, variant: "destructive" });
      if (msg.includes("No access token found") || msg.includes("access token expired")) {
        setVendor(null);
        router.push("/login");
      }
    }
  };

  return (
    <VendorRouteWrapper title="Profile" currentStep={1}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e: any) => {
            console.log("error", e);
          })}
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-2xl ">
                  {// the initials of the name
                  vendor?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="secondary" size="sm" className="absolute bottom-0 right-0 rounded-full" type="button">
                <CameraIcon className="h-4 w-4" />
                <span className="sr-only">Upload profile image</span>
              </Button>
            </div>

            <div className="grid gap-2 text-center sm:text-left">
              <h1 className="text-2xl font-bold drop-shadow-lg">{vendor?.name || ""}</h1>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="">
                    {/* <FormLabel>Introduction</FormLabel> */}
                    <FormControl>
                      <Input {...field} placeholder="Give a short description" defaultValue={vendor?.description} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant="default"
              size="sm"
              className="ml-auto mt-auto p-4 text-base font-semibold shadow-lg lg:p-6"
              type="submit"
              // onClick={() => console.log("form details", form.getValues())}
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Profile
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-8">
            <ContactDetails form={form} />
            <SocialDetails form={form} />
            <Introduction form={form} />
          </div>
          {/* <Separator className="my-8" />
          <h2 className="text-lg font-semibold">Images</h2>
          <h3 className="text-md mb-2 font-semibold  ">Uploaded</h3>
          <section className="max-h-[50vh] overflow-auto">
            <DndUploader />
          </section>
          <Separator className="my-8" />
          <section className="max-h-[50vh] overflow-auto">
            <UplodedImages />
          </section> */}
        </form>
      </Form>
    </VendorRouteWrapper>
  );
};

export default Page;
