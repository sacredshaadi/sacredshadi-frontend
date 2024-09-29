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
        usePagination
        searchKey="title"
        addable
        editable
        deleteable
        columns={[
          { accessorKey: "subType", header: "Sub Type" },
          {
            header: "Created At",
            accessorKey: "createdAt",
            accessorFn: (data) => dayjs(data.createdAt).format("DD-MM-YYYY HH:mm A")
          },
          {
            header: "Updated At",
            accessorKey: "updatedAt",
            accessorFn: (data) => dayjs(data.updatedAt).format("DD-MM-YYYY HH:mm A")
          }
        ]}
        addEditFormMeta={[
          { id: "subTypeLabel", name: "label", props: { text: "Sub Type", htmlFor: "subTypeTitle", required: true } },
          { id: "subTypeTitle", name: "input", props: { name: "subType", className: "mb-4", required: true } }
        ]}
        editDataEndpoint="/api/v1/vendor-sub-type/update"
        deleteDataEndpoint="/api/v1/vendor-sub-type/remove"
        addDataEndpoint={`/api/v1/vendor-sub-type/${params.serviceId}/create`}
        paginateDataEndpoint={`/api/v1/vendor-sub-type/${params.serviceId}/all`}
      />
    </SuperAdminLayout>
  );
}

export default SpecificServiceDetails;
