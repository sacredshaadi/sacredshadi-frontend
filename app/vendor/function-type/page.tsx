import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import Timeline from "../_components/timeline/timeline";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import CardWrapper from "../_components/vendor-route-wrapper/card-wrapper";
import ServiceModal from "../service-type/service-modal";
import FunctionsComp from "./functions-comp";

const page = () => {
  return (
    <VendorRouteWrapper
      title="Function Type"
      currentStep={3}
      serviceType="Function Type"
      guidelines={["Please add what are the function you cover and add a cover photo for the same."]}
      headerNav={<ServiceModal />}
      nextBtnLink="/vendor/package"
    >
      <section className="flex flex-col gap-4">
        <h1 className="text-lg font-bold sm:text-xl lg:text-3xl">Type(s) of functions</h1>
        <FunctionsComp />
      </section>
    </VendorRouteWrapper>
  );
};

export default page;
