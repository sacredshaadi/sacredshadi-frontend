"use client";

import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import dayjs from "dayjs";

function VendorTypes() {
  return (
    <SuperAdminLayout title="Vendor types">
      <TableHOC
        searchKey="type"
        addable
        editable
        deleteable
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
          { id: "typeLabel", name: "label", props: { text: "Type", htmlFor: "vendorTypeType", required: true } },
          { id: "vendorTypeType", name: "input", props: { name: "type", className: "mb-4", required: true } },

          {
            id: "vendorTypeDescriptionLabel",
            name: "label",
            props: { text: "Description", htmlFor: "vendorTypeDescription", required: true }
          },
          {
            id: "vendorTypeDescription",
            name: "textAreaInput",
            props: { name: "description", className: "mb-4", required: true }
          },

          {
            id: "vendorTypeShortDescriptionLabel",
            name: "label",
            props: { text: "Short Description", htmlFor: "vendorTypeShortDescription", required: true }
          },
          {
            id: "vendorTypeShortDescription",
            name: "textAreaInput",
            props: { name: "shortDescription", className: "mb-4", required: true }
          }
        ]}
        addDataEndpoint="/api/v1/vendor-type/create"
        editDataEndpoint="/api/v1/vendor-type/update"
        paginateDataEndpoint="/api/v1/vendor-type/all"
        deleteDataEndpoint="/api/v1/vendor-type/remove"
      />
    </SuperAdminLayout>
  );
}

export default VendorTypes;
