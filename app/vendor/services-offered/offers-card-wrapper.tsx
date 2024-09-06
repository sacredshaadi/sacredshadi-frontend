"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/app/context/user-context";
import { useVendorContext } from "@/app/context/vendor-context";
import ServiceCard from "./card-details/service-card";
import { useRouter } from "next/navigation";
import { useGetAllOffersMutation } from "@/components/api";
import { ServiceOffered } from "@/types/auth.types";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface CardWrapperProps {}

const OffersCardWrapper = (props: CardWrapperProps) => {
  const { vendor, setVendor } = useUserStore();
  const { servicesOffered, setServicesOffered } = useVendorContext();
  const { mutate: mutateFn, isPending } = useGetAllOffersMutation();
  const router = useRouter();

  useEffect(() => {
    try {
      if (!vendor?.tokens.accessToken) {
        setVendor(null);
        router.push("/login");
        return;
      }
      mutateFn(vendor?.tokens.accessToken, {
        onSuccess: (data) => setServicesOffered(data.data as ServiceOffered[]),
        onError: (err: any) => {
          const desc: string = err.message || err.error || "Error fetching data";
          toast({ variant: "destructive", description: desc });

          if (desc.includes("token expired")) {
            setVendor(null);
            router.push("/login");
          }
          throw err;
        }
      });
    } catch (err: any) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="mb-2 mt-4 text-lg font-bold sm:text-xl lg:text-3xl">Service package(s) offered</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
        {isPending && servicesOffered.length === 0
          ? [1, 2, 3, 4].map((_, idx) => <Skeleton key={idx} className="h-10 w-10" />)
          : servicesOffered?.map((service, index) => (
              <ServiceCard
                key={index}
                offerObj={service}
                vendorSubType={
                  vendor?.SelectedVendorSubTypes?.find((item) => item.vendorSubTypeId === service.serviceOfferedId)
                    ?.subType || ""
                }
              />
            ))}
      </section>
    </section>
  );
};

export default OffersCardWrapper;
