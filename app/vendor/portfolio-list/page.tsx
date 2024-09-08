import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import { PortfolioList } from "../_components/portfolio-list";

const page = () => {
  return (
    <VendorRouteWrapper title="Portfolio List" currentStep={4}>
      <PortfolioList />
    </VendorRouteWrapper>
  );
};

export default page;
