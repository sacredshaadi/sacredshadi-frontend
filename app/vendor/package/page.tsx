import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import CardWrapper from "../_components/vendor-route-wrapper/card-wrapper";

const page = () => {
  return (
    <VendorRouteWrapper
      title="Package Type"
      currentStep={4}
      serviceType="Package Type"
      guidelines={[
        "Please click on create new to add a new package.",
        "Select service type, select function type and what will be the charge for that service for the corresponding function."
      ]}
    >
      <CardWrapper type="Packages" />
    </VendorRouteWrapper>
  );
};

export default page;
