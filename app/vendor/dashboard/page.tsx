"use client";

import React from "react";
import LogisticCard from "./logistic-card";
import { DashboardLogisticType } from "@/types";
import { VendorLayout } from "../_components/vendor-layout";
import { useUserStore } from "@/app/context/user-context";

const page = () => {
  const { vendor } = useUserStore();

  return (
    <VendorLayout title="Dashboard" hideNextBtn>
      <section className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        <LogisticCard logisticType={DashboardLogisticType.viewed} metric={vendor?.totalViews || 0} />
        <LogisticCard logisticType={DashboardLogisticType.quotation} metric={vendor?.totalQuotation || 0} />
        <LogisticCard logisticType={DashboardLogisticType.contacted} metric={vendor?.totalPeopleReached || 0} />
        <LogisticCard logisticType={DashboardLogisticType.booked} metric={vendor?.totalBooking || 0} />
      </section>
    </VendorLayout>
  );
};

export default page;
