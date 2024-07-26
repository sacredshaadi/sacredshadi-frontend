import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import Timeline from "../_components/timeline/timeline";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import CardWrapper from "../_components/vendor-route-wrapper/card-wrapper";

const page = () => {
  return (
    <VendorRouteWrapper
      title="Function Type"
      currentStep={3}
      serviceType="Function Type"
      guidelines={["Please add what are the function you cover and add a cover photo for the same."]}
    >
      <CardWrapper type="Function" />
    </VendorRouteWrapper>
  );
};

export default page;
