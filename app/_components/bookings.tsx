"use client";

import { useRouter } from "next/navigation";
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
    <div className="my-56 flex flex-col items-center justify-center">
      {/* TODO: handle this := get user bookings */}
      <h1 className="text-2xl font-bold">No booking found</h1>
      <p className="text-gray-500">You have not made any booking yet</p>
    </div>
  );
}
