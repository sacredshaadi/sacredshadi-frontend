"use client";

import React, { useEffect } from "react";

import { useGetAllVendorFeedbacksMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useVendorContext } from "@/app/context/vendor-context";
import { Feedback } from "@/types/user-facing";
import FeedbackNodes from "./feedback-nodes";

const FeedbackComp = () => {
  const { vendor, setVendor } = useUserStore();
  const { setFeedbacks } = useVendorContext();
  const { mutate: getFn, isPending, isError, isIdle } = useGetAllVendorFeedbacksMutation();
  const router = useRouter();

  useEffect(() => {
    if (!vendor?.vendorId) {
      setVendor(null);
      router.push("/login");
      return;
    }
    try {
      getFn(vendor.vendorId, {
        onSuccess(data) {
          setFeedbacks(data.data as Feedback[]);
        },
        onError(error) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor?.vendorId]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      {isIdle && isPending && (
        <Skeleton>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold"></h1>
            <p className="text-gray-500"></p>
          </div>
        </Skeleton>
      )}
      {isError && <h1 className="text-3xl font-bold">Failed to fetch feedbacks</h1>}
      {!isPending && !isError && !isIdle && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeedbackNodes />
        </div>
      )}
    </div>
  );
};

export default FeedbackComp;
