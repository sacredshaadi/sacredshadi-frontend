import React, { useEffect } from "react";

import { useGetAllVendorFunctionsMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";

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

  return <div>FunctionsComp</div>;
};

export default FunctionsComp;
