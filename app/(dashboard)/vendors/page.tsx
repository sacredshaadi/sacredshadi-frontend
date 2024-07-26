import VendorWrapper from "@/app/_components/vendor-wrapper";
import { getAllVendorTypes } from "@/app/utils/functions";
import React from "react";

const Vendor = async () => {
  const vendorTypes = await getAllVendorTypes();
  // console.log("vendortypes --- > ", vendorTypes);

  return <VendorWrapper vendorTypes={vendorTypes || []} />;
};

export default Vendor;
