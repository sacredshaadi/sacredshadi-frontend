import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import { Button } from "@/components/ui/button";
import AddServiceNav from "./add-service-nav";

const ServicesOffered = () => {
  return (
    <VendorRouteWrapper
      title="Services Offered"
      currentStep={4}
      nextBtnLink="/vendor/additional-details"
      headerNav={<AddServiceNav />}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">No Services Offered Yet</h1>
        <p className="text-gray-500">You have no services offered yet</p>
      </div>
    </VendorRouteWrapper>
  );
};

export default ServicesOffered;
