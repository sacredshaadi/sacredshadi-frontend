import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import Timeline from "../_components/timeline/timeline";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";

const page = () => {
  return (
    <VendorRouteWrapper title="Portfolio List" currentStep={6}>
      <section>Portfolio List</section>
    </VendorRouteWrapper>
  );
};

export default page;
