"use client";

import SuperAdminLayout from "../_components/layout";
import TableHOC from "../_components/tableHoc";
import dayjs from "dayjs";

function VendorTypes() {
  return (
    <SuperAdminLayout title="Vendor types">
      <TableHOC
        columns={[
          { accessorKey: "type", header: "Type" },
          { accessorKey: "description", header: "Description" },
          { accessorKey: "shortDescription", header: "Short Description" },
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
          { id: "typeLabel", name: "label", props: { text: "Type", htmlFor: "type", required: true } },
          { id: "type", name: "input", props: { name: "type", className: "mb-4", required: true } },

          {
            id: "descriptionLabel",
            name: "label",
            props: { text: "Description", htmlFor: "description", required: true }
          },
          {
            id: "description",
            name: "textAreaInput",
            props: { name: "description", className: "mb-4", required: true }
          },

          {
            id: "shortDescriptionLabel",
            name: "label",
            props: { text: "Short Description", htmlFor: "shortDescription", required: true }
          },
          {
            id: "shortDescription",
            name: "textAreaInput",
            props: { name: "shortDescription", className: "mb-4", required: true }
          }
        ]}
        addDataEndpoint=""
        editDataEndpoint="/api/v1/vendor-type/update"
        paginateDataEndpoint="/api/v1/vendor-type/all"
        deleteDataEndpoint="/api/v1/vendor-type/remove"
      />
    </SuperAdminLayout>
  );
}

export default VendorTypes;
