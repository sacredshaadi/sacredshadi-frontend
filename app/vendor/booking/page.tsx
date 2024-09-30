import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import BookingComponent from "./booking-component";

const page = () => {
  return (
    <VendorLayout title="Booking" hideNextBtn>
      <BookingComponent />
    </VendorLayout>
  );
};

export default page;
