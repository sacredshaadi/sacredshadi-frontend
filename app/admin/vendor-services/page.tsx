"use client";

import dayjs from "dayjs";
import TableHOC from "../_components/tableHoc";
import { SuperAdminLayout } from "../_components/adminLayout";
import Image from "next/image";
import { ErrorBoundary } from "@/components/errorBoundary";

function Slider() {
  return (
    <SuperAdminLayout title="Service Offers">
      <TableHOC
        searchKey="description"
        usePagination
        addable={false}
        editable={false}
        deleteable={false}
        columns={[
          { accessorKey: "price", header: "Price" },
          { accessorKey: "description", header: "Description" },
          { accessorKey: "details", header: "Details" },
          {
            header: "Image",
            accessorKey: "image",
            cell: (data) => (
              <ErrorBoundary fallback={<p className="text-sm font-semibold text-red-500">Image render error</p>}>
                <Image height={80} width={100} src={data.getValue() as string} alt="slider" />
              </ErrorBoundary>
            )
          },
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
        paginateDataEndpoint="/api/v1/service-offer/all"
      />
    </SuperAdminLayout>
  );
}

export default Slider;
