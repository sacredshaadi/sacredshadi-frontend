import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import BookingComponent from "./booking-component";

export default function Page() {
  return (
    <VendorLayout title="Booking" hideNextBtn>
      <BookingComponent />
    </VendorLayout>
  );
}
