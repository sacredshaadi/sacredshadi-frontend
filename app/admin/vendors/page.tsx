"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";

function AdminVendors() {
  return (
    <SuperAdminLayout title="Vendors">
      <TableHOC
        searchKey="name"
        usePagination
        columns={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "isActive", header: "Active", accessorFn: (data) => (data.isActive ? "Yes" : "No") },
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
