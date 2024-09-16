"use client";

import { toast } from "@/components/ui/use-toast";

export const checkToken = (profileObj: any, setProfile: (val: any) => void, router: any) => {
  try {
    if (!profileObj?.tokens?.accessToken) throw new Error("No access token found");
  } catch (err: any) {
    toast({ title: "Error", description: err.error || err.message || "Something went wrong", variant: "destructive" });
    setProfile(null);
    router.push("/login");
  }
};
