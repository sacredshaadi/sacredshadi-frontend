import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import LogisticCard from "./logistic-card";
import { DashboardLogisticType } from "@/types";
import { VendorLayout } from "../_components/vendor-layout";
import { AddDialog } from "../_components/vendor-route-wrapper/add-modal";

const page = () => {
  return (
    <VendorLayout title="Dashboard">
      <section className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        <LogisticCard logisticType={DashboardLogisticType.viewed} />
        <LogisticCard logisticType={DashboardLogisticType.quotation} />
        <LogisticCard logisticType={DashboardLogisticType.contacted} />
        <LogisticCard logisticType={DashboardLogisticType.booked} />
      </section>
    </VendorLayout>
  );
};

export default page;
