import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import { Button } from "@/components/ui/button";
import AddServiceNav from "./add-service-nav";
import OffersCardWrapper from "./offers-card-wrapper";

const ServicesOffered = () => {
  return (
    <VendorRouteWrapper
      title="Services Offered"
      currentStep={3}
      nextBtnLink="/vendor/additional-details"
      headerNav={<AddServiceNav />}
    >
      <OffersCardWrapper />
    </VendorRouteWrapper>
  );
};

export default ServicesOffered;
