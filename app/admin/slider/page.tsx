"use client";

import dayjs from "dayjs";
import TableHOC from "../_components/tableHoc";
import { SuperAdminLayout } from "../_components/adminLayout";
import Image from "next/image";
import { ErrorBoundary } from "@/components/errorBoundary";

function Slider() {
  return (
    <SuperAdminLayout title="Slider">
      <TableHOC
        searchKey="title"
        addable
        editable
        deleteable
        columns={[
          { accessorKey: "title", header: "Title" },
          { accessorKey: "link", header: "Link" },
          { accessorKey: "description", header: "Description" },
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
          {
            id: "sliderTitleLabel",
            name: "label",
            props: { text: "Title", htmlFor: "sliderTitleName", required: true }
          },
          { id: "sliderTitleName", name: "input", props: { name: "title", className: "mb-4", required: true } },

          {
            id: "sliderDescriptionLabel",
            name: "label",
            props: { text: "Description", htmlFor: "sliderDescriptionName", required: true }
          },
          {
            id: "sliderDescriptionName",
            name: "input",
            props: { name: "description", className: "mb-4", required: true }
          },

          {
            id: "sliderLinkLabel",
            name: "label",
            props: { text: "Link", htmlFor: "sliderLinkName", required: true }
          },
          {
            id: "sliderLinkName",
            name: "input",
            props: { name: "link", className: "mb-4", required: true }
          },

          {
            id: "sliderImageLabel",
            name: "label",
            props: { text: "Slider image", htmlFor: "sliderImageName", required: true }
          },
          {
            id: "sliderImageName",
            name: "imageInput",
            props: { name: "image", className: "mb-4", required: true }
          }
        ]}
        addDataEndpoint="/api/v1/sliders/create"
        editDataEndpoint="/api/v1/sliders/update"
        paginateDataEndpoint="/api/v1/sliders/all"
        deleteDataEndpoint="/api/v1/sliders/remove"
      />
    </SuperAdminLayout>
  );
}

export default Slider;
