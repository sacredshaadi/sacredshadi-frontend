"use client";

import React, { useEffect } from "react";

import { useGetAllVendorFunctionsMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import SubServiceCard from "../service-type/sub-service-card";
import { useRouter } from "next/navigation";

const FunctionsComp = () => {
  const { mutate, isPending, isError } = useGetAllVendorFunctionsMutation();
  const { vendor, setVendor } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!vendor?.tokens.accessToken) return;
    try {
      mutate(vendor.tokens.accessToken, {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          throw error;
        }
      });
    } catch (err: any) {
      const desc: string = err.message || err.error || "Error fetching data";
      toast({
        variant: "destructive",
        description: desc
      });
      if (desc.includes("token expired")) {
        setVendor(null);
        router.push("/login");
      }
      throw err;
    }
  }, [vendor?.tokens.accessToken]);

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 3xl:grid-cols-6">
      {vendor?.SelectedVendorSubTypes.map((item) => <SubServiceCard key={item.vendorSubTypeId} vendorSubtype={item} />)}
    </section>
  );
};

export default FunctionsComp;
