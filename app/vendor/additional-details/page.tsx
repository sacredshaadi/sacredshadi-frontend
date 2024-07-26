import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import Timeline from "../_components/timeline/timeline";

const page = () => {
  return (
    <VendorLayout title="Additional Details">
      <Timeline currentStep={5} />
      <div>page</div>
    </VendorLayout>
  );
};

export default page;
