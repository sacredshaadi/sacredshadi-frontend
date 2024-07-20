import React from "react";

const Booking = () => {
  // return a component which says you have no booking
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">No booking found</h1>
      <p className="text-gray-500">You have not made any booking yet</p>
    </div>
  );
};

export default Booking;
