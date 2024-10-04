"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiConfig/apiClient";
import { useUserStore } from "@/app/context/user-context";
import { CellContext } from "@tanstack/react-table";

function AdminVendors() {
  const { super_admin } = useUserStore();

  const { mutate } = useMutation({
    mutationKey: ["/api/v1/admin/get-all-users?userType=vendor"],
    mutationFn: (props: { vendorId: number; status: "active" | "inactive" }) => {
      return apiClient("/api/v1/admin/verify-vendor", {
        method: "POST",
        body: JSON.stringify({ vendorUserId: props.vendorId, status: props.status }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${super_admin?.tokens.accessToken}` }
      });
    }
  });

  return (
    <SuperAdminLayout title="Vendors">
      <TableHOC
        searchKey="name"
        usePagination
        columns={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
          {
            header: "Active",
            accessorKey: "isActive",
            cell: ({ row }: CellContext<any, unknown>) => (
              <Button
                size="sm"
                className="font-semibold"
                onClick={() =>
                  mutate({ vendorId: row.original.id, status: row.original.isActive ? "inactive" : "active" })
                }
              >
                {row.original.isActive ? "Deactivate" : "Activate"}
              </Button>
            )
          },
          { accessorKey: "phone", header: "Phone", accessorFn: (data) => data.phone || "" },
          {
            accessorKey: "createdAt",
            header: "Created At",
            accessorFn: (data) => dayjs(data.createdAt).format("DD-MM-YYYY HH:mm A")
          },
          {
            accessorKey: "updatedAt",
            header: "Updated At",
            accessorFn: (data) => dayjs(data.updatedAt).format("DD-MM-YYYY HH:mm A")
          }
        ]}
        addable={false}
        editable={false}
        deleteable={false}
        paginateDataEndpoint="/api/v1/admin/get-all-users?userType=vendor"
      />
    </SuperAdminLayout>
  );
}

export default AdminVendors;
