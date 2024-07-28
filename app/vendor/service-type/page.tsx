import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import Timeline from "../_components/timeline/timeline";
import { Separator } from "@/components/ui/separator";
import SubServiceCard from "./sub-service-card";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import CardWrapper from "../_components/vendor-route-wrapper/card-wrapper";
import { AddDialog } from "../_components/vendor-route-wrapper/add-modal";
import { useGetAllVendorTypesMutation } from "@/components/api";
import ServiceModal from "./service-modal";

const page = () => {
  return (
    <VendorRouteWrapper
      title="Service Type"
      currentStep={2}
      serviceType="Service Type"
      guidelines={[
        "Please click on Create new and add the services you offer and a short description.",
        "Please choose other if the service you provide are not listed here."
      ]}
      headerNav={<ServiceModal />}
    >
      <CardWrapper type="Service" />
    </VendorRouteWrapper>
  );
};

export default page;
