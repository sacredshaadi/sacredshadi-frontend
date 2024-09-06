"use client";

import TableHOC from "@/app/admin/_components/tableHoc";
import { useUserStore } from "@/app/context/user-context";
import { ErrorBoundary } from "@/components/errorBoundary";
import { userAuthTypes } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";

export function PortfolioList() {
  const { vendor } = useUserStore();
  if (!vendor) {
    return (
      <div className="my-56 flex cursor-pointer flex-col items-center justify-center hover:text-rose-600">
        <h1 className="text-2xl font-bold">No portfolio list found</h1>
      </div>
    );
  }

  return (
    <TableHOC
      addable
      editable
      deleteable
      searchKey="title"
      authType={userAuthTypes.vendor}
      columns={[
        { accessorKey: "title", header: "Title" },
        {
          header: "Asset (image/video)",
          accessorKey: "url",
          cell: (data) => (
            <ErrorBoundary fallback={<p className="text-sm font-semibold text-red-500">render error</p>}>
              {(data.row.original as any).type === "image" ? (
                <Image height={80} width={100} src={data.getValue() as string} alt="slider" />
              ) : (
                <div className="">Video</div>
              )}
            </ErrorBoundary>
          )
        },
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
      addDataEndpoint="/api/v1/album/create"
      addEditFormMeta={[
        {
          name: "label",
          id: "portfolioListTitleLabel",
          props: { text: "Title", htmlFor: "portfolioListTitleName", required: true }
        },
        { id: "portfolioListTitleName", name: "input", props: { name: "title", className: "mb-4", required: true } },

        {
          name: "label",
          id: "portfolioListLabel",
          props: { text: "Type", htmlFor: "portfolioListType", required: true }
        },
        {
          name: "singleSelect",
          id: "portfolioListType",
          props: { name: "type", className: "mb-4", required: true, options: ["image", "video"], defaultValue: "image" }
        },

        {
          name: "label",
          id: "portfolioListImageLabel",
          props: { text: "Asset (Image/video)", htmlFor: "portfolioListImageName", required: true }
        },
        {
          name: "imageInput",
          id: "portfolioListImageName",
          props: { name: "url", className: "mb-4", required: true }
        }
      ]}
      editDataEndpoint="/api/v1/album/update"
      deleteDataEndpoint="/api/v1/album/remove"
      paginateDataEndpoint={`/api/v1/album/${vendor.vendorId}`}
    />
  );
}
