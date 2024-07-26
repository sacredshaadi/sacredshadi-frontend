import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import Timeline from "../_components/timeline/timeline";

const page = () => {
  return (
    <VendorLayout title="Profile">
      <Timeline currentStep={6} />
      <div>page</div>
    </VendorLayout>
  );
};

export default page;
