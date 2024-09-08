"use client";

import { useVendorSearch } from "@/hooks/useVendorSearch";

export function VendorSearchGrid(props: {}) {
  const { data, isPending } = useVendorSearch();

  return <section className="">{JSON.stringify(data, null, 2)}</section>;
}
