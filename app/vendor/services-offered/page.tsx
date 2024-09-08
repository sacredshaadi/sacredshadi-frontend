import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import AddServiceNav from "./add-service-nav";
import OffersCardWrapper from "./offers-card-wrapper";

const ServicesOffered = () => {
  return (
    <VendorRouteWrapper title="Services Offered" currentStep={3} headerNav={<AddServiceNav />}>
      <OffersCardWrapper />
    </VendorRouteWrapper>
  );
};

export default ServicesOffered;
