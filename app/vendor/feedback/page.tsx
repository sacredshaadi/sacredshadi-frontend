import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import FeedbackComp from "./feedback-comp";

const page = () => {
  return (
    <VendorLayout title="Feedback" hideNextBtn>
      <FeedbackComp />
    </VendorLayout>
  );
};

export default page;
