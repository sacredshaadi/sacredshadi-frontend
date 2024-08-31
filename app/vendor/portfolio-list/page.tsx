import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";

const page = () => {
  return (
    <VendorRouteWrapper title="Portfolio List" currentStep={5} nextBtnLink="/vendor/booking">
      <section>Portfolio List</section>
    </VendorRouteWrapper>
  );
};

export default page;
