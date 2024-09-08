"use client";

import React, { useEffect } from "react";
import { useVendorContext } from "@/app/context/vendor-context";
import { Skeleton } from "@/components/ui/skeleton";
import useStateRef from "react-usestateref";

interface TitleProps {
  id: number;
}

const Title = (props: TitleProps) => {
  const { vendorTypes } = useVendorContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setVendorName, vendorNameRef] = useStateRef<string | null>(null);

  useEffect(() => {
    setVendorName(() => vendorTypes.filter((vendor) => vendor.id === props.id)[0]?.type ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorTypes]);

  return (
    <h1 className="lg:leading-tighter flex items-center gap-5 text-3xl font-bold tracking-tighter">
      {vendorNameRef.current ? (
        <h2>Inquiry for {vendorNameRef.current}</h2>
      ) : (
        <Skeleton className="h-16 w-96 bg-gray-100" />
      )}
    </h1>
  );
};

export default Title;
