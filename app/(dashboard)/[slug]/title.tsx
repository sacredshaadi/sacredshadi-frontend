"use client";

import React, { useEffect, useRef } from "react";
import { useVendorContext } from "@/app/context/vendor-context";
import { Skeleton } from "@/components/ui/skeleton";
import useStateRef from "react-usestateref";

interface TitleProps {
  id: number;
}

const Title = ({ id }: TitleProps) => {
  const { vendorTypes } = useVendorContext();
  const [_, setVendorName, vendorNameRef] = useStateRef<string | null>(null);

  useEffect(() => {
    setVendorName(() => vendorTypes.filter((vendor) => vendor.id === id)[0]?.type ?? null);
  }, [vendorTypes]);

  return (
    <h1
      className="lg:leading-tighter flex items-center gap-5 text-3xl font-bold tracking-tighter sm:text-4xl
      md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]"
    >
      {vendorNameRef.current ? (
        <>Inquiry for {vendorNameRef.current}</>
      ) : (
        <Skeleton className="h-16 w-96 bg-gray-100" />
      )}
    </h1>
  );
};

export default Title;
