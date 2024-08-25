import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import Timeline from "../_components/timeline/timeline";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";

const page = () => {
  return (
    <VendorRouteWrapper
      title="Additional Details"
      currentStep={5}
      serviceType="Additional Details"
      guidelines={[" Please give us more information which will help us understand you better."]}
      nextBtnLink="/vendor/portfolio-list"
    >
      {/* <CardWrapper type="Packages" /> */}
    </VendorRouteWrapper>
  );
};

export default page;
