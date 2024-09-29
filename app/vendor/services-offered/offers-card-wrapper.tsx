"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";
import { useGetAllOffersForVendorMutation } from "@/components/api";
import { useVendorSearch } from "@/hooks/useVendorSearch";
import { VendorSearchGrid } from "@/app/search/[slug]/vendor-search-grid";

interface CardWrapperProps {}

const OffersCardWrapper = (props: CardWrapperProps) => {
  const { vendor, setVendor } = useUserStore();
  // const { mutate: mutateFn, isPending } = useGetAllOffersForVendorMutation();
  const { onFormSubmit } = useVendorSearch(useGetAllOffersForVendorMutation);
  const router = useRouter();

  useEffect(() => {
    try {
      if (!vendor?.tokens.accessToken) {
        setVendor(null);
        router.push("/login");
        return;
      }
      onFormSubmit({ accessToken: vendor.tokens.accessToken });
    } catch (err: any) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="mb-2 mt-4 text-lg font-bold sm:text-xl lg:text-3xl">Service package(s) offered</h1>
      {/* <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4"> */}
      {/* {isPending && servicesOffered.length === 0
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
            ))} */}
      <VendorSearchGrid mutation={useGetAllOffersForVendorMutation} />
      {/* </section> */}
    </section>
  );
};

export default OffersCardWrapper;
