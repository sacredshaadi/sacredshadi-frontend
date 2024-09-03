"use client";

import { useParams } from "next/navigation";
import { SuperAdminLayout } from "../../_components/adminLayout";
import TableHOC from "../../_components/tableHoc";
import dayjs from "dayjs";

function SpecificServiceDetails() {
  const params = useParams();

  return (
    <SuperAdminLayout title="Service Details">
      <TableHOC
        searchKey="title"
        addable
        editable
        deleteable
        columns={[
          { accessorKey: "subType", header: "Sub Type" },
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
          { id: "subTypeLabel", name: "label", props: { text: "Sub Type", htmlFor: "subTypeTitle", required: true } },
          { id: "subTypeTitle", name: "input", props: { name: "subType", className: "mb-4", required: true } }
        ]}
        addDataEndpoint={`/api/v1/vendor-sub-type/${params.serviceId}/create`}
        editDataEndpoint="/api/v1/vendor-sub-type/update"
        paginateDataEndpoint={`/api/v1/vendor-sub-type/${params.serviceId}/all`}
        deleteDataEndpoint="/api/v1/vendor-sub-type/remove"
      />
    </SuperAdminLayout>
  );
}

export default SpecificServiceDetails;
