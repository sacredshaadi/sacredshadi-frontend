"use client";

import React, { useEffect } from "react";

import { useGetAllVendorFunctionsMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import SubServiceCard from "../service-type/sub-service-card";

const FunctionsComp = () => {
  const { mutate, isPending, isError } = useGetAllVendorFunctionsMutation();
  const { vendor } = useUserStore();

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
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        description: error.error || error.message || "Error fetching functions"
      });
    }
  }, [vendor?.tokens.accessToken]);

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 3xl:grid-cols-6">
      {vendor?.SelectedVendorSubTypes.map((item) => <SubServiceCard key={item.id} vendorSubtype={item} />)}
    </section>
  );
};

export default FunctionsComp;
