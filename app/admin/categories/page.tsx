"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";

function Categories() {
  return (
    <SuperAdminLayout title="Categories">
      <TableHOC
        searchKey="name"
        usePagination
        addable
        editable
        deleteable
        columns={[
          { accessorKey: "name", header: "Name" },
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
        addEditFormMeta={[
          { id: "categoryNameLabel", name: "label", props: { text: "Name", htmlFor: "categoryName", required: true } },
          { id: "categoryName", name: "input", props: { name: "name", className: "mb-4", required: true } }
        ]}
        addDataEndpoint="/api/v1/category/create"
        editDataEndpoint="/api/v1/category/update"
        paginateDataEndpoint="/api/v1/category/all"
        deleteDataEndpoint="/api/v1/category/remove"
      />
    </SuperAdminLayout>
  );
}

export default Categories;
