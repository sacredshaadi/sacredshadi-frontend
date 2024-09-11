"use client";

import { useRouter } from "next/navigation";
import BookingNodesComponent from "../(dashboard)/booking/booking-nodes-component";
import { useUserStore } from "../context/user-context";

function NoUserState() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/login")}
      className="my-56 flex cursor-pointer flex-col items-center justify-center hover:text-rose-600"
    >
      <h1 className="text-2xl font-bold">You are not logged in</h1>
      <p className="text-gray-500">Please login to see your bookings</p>
    </div>
  );
}

export function ShowBookings() {
  const { user } = useUserStore();

  if (!user) return <NoUserState />;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Your Bookings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BookingNodesComponent />
      </div>
    </div>
  );
}
