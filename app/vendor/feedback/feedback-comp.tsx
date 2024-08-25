"use client";

import React, { useEffect } from "react";

import { useGetAllVendorFeedbacksMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const FeedbackComp = () => {
  const { vendor } = useUserStore();
  const { mutate: getFn, isPending, isError } = useGetAllVendorFeedbacksMutation();

  useEffect(() => {
    if (!vendor?.tokens.accessToken) return;
    try {
      getFn(vendor.tokens.accessToken, {
        onSuccess(data, variables, context) {
          console.log("onSuccess", data, variables, context);
        },
        onError(error) {
          throw error;
        }
      });
    } catch (err: any) {
      console.error("error", err);
      toast({
        variant: "destructive",
        description: err.error || err.message || "Failed to fetch feedback"
      });
    }
  }, [vendor?.vendorId]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      {isPending && (
        <Skeleton>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">No Feedbacks Yet</h1>
            <p className="text-gray-500">You have no feedbacks yet</p>
          </div>
        </Skeleton>
      )}
      {isError && <h1 className="text-3xl font-bold">Failed to fetch feedbacks</h1>}
      {!isPending && !isError && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">No Feedbacks Yet</h1>
          <p className="text-gray-500">You have no feedbacks yet</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackComp;
