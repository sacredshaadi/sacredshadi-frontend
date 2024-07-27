"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiConfig/apiClient";
import { adminEndpoints } from "@/lib/apiConfig/endpoints";
import { useUserStore } from "@/app/context/user-context";
import { Card, CardContent } from "@/components/ui/card";

type DashboardData = {
  totalBookings: number;
  activeBookings: number;
  registeredUsers: number;
  registeredVendors: number;
};

const useAdminDashboardQuery = () => {
  const { super_admin } = useUserStore();
  return useQuery<{ data: DashboardData }>({
    queryKey: ["admin-dashboard"],
    queryFn: () => {
      return apiClient(adminEndpoints.getDashboardData, {
        method: "GET",
        headers: { Authorization: `Bearer ${super_admin?.tokens.accessToken}` }
      });
    }
  });
};

const AdminDashboardSingleCard = (props: { label: string; value: number }) => {
  return (
    <Card className="min-w-56 flex-grow">
      <CardContent className="flex items-center justify-between gap-6 p-6">
        <div>
          <h3 className="text-lg font-semibold">{props.label}</h3>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <h3 className="text-3xl font-semibold">{props.value}</h3>
      </CardContent>
    </Card>
  );
};

const AdminDashboardCards = () => {
  const { data: res, isLoading } = useAdminDashboardQuery();

  if (isLoading || !res) return <div>Loading...</div>;
  return (
    <div className="flex flex-col flex-wrap gap-4 md:flex-row">
      <AdminDashboardSingleCard label="Total Bookings" value={res.data.totalBookings || 0} />
      <AdminDashboardSingleCard label="Active Bookings" value={res.data.activeBookings || 0} />
      <AdminDashboardSingleCard label="Registered Users" value={res.data.registeredUsers || 0} />
      <AdminDashboardSingleCard label="Registered Vendors" value={res.data.registeredVendors || 0} />
    </div>
  );
};

export default AdminDashboardCards;
