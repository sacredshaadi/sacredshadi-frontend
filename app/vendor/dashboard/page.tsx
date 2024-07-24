import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import LogisticCard from "./logistic-card";
import { DashboardLogisticType } from "@/types";

const page = () => {
  return (
    <SuperAdminLayout title="Dashboard" vendorSide>
      <section className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        <LogisticCard logisticType={DashboardLogisticType.viewed} />
        <LogisticCard logisticType={DashboardLogisticType.quotation} />
        <LogisticCard logisticType={DashboardLogisticType.contacted} />
        <LogisticCard logisticType={DashboardLogisticType.booked} />
      </section>
    </SuperAdminLayout>
  );
};

export default page;
