import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import FeedbackComp from "./feedback-comp";

const page = () => {
  return (
    <VendorLayout title="Feedback">
      {/* <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">No Feedbacks Yet</h1>
        <p className="text-gray-500">You have no feedbacks yet</p>
      </div> */}
      <FeedbackComp />
    </VendorLayout>
  );
};

export default page;
