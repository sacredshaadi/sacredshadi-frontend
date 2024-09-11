import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import BookingComponent from "./booking-component";

const page = () => {
  return (
    <VendorLayout title="Booking" hideNextBtn>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BookingComponent />
      </div>
    </VendorLayout>
  );
};

export default page;
