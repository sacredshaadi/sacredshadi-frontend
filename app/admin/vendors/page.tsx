"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiConfig/apiClient";
import { useUserStore } from "@/app/context/user-context";
import { CellContext } from "@tanstack/react-table";

function UpdateButton(props: { vendorId: number; isActive: boolean }) {
  const { super_admin } = useUserStore();

  const { mutate } = useMutation({
    mutationKey: ["/api/v1/admin/get-all-users?userType=vendor"],
    mutationFn: () => {
      return apiClient("/api/v1/admin/verify-vendor", {
        method: "POST",
        body: JSON.stringify({ vendorUserId: props.vendorId, status: "active" }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${super_admin?.tokens.accessToken}` }
      });
    }
  });

  if (props.isActive) return "Active";
  return (
    <Button size="sm" className="font-semibold" onClick={() => mutate()}>
      Activate
    </Button>
  );
}

function AdminVendors() {
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
              <UpdateButton vendorId={row.original.id} isActive={row.original.isActive} />
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
