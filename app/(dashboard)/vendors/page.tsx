import VendorWrapper from "@/app/_components/vendor-wrapper";
import { vendorTypeUrls } from "@/lib/apiConfig/urls";
import { getAllVendorTypes } from "@/app/utils/functions";
import React from "react";

const Vendor = async () => {
  const vendorTypes = await getAllVendorTypes();

  return <VendorWrapper vendorTypes={vendorTypes || []} />;
};

export default Vendor;
