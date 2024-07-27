"use client";

import dayjs from "dayjs";
import TableHOC from "../_components/tableHoc";
import { SuperAdminLayout } from "../_components/adminLayout";

function Slider() {
  return (
    <SuperAdminLayout title="Slider">
      <TableHOC
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
        // { "title": "string", "description": "string", "image": "string", "isActive": true }
        addEditFormMeta={[
          { id: "sliderTitleLabel", name: "label", props: { text: "Title", htmlFor: "sliderTitle", required: true } },
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
            id: "sliderIsActiveLabel",
            name: "label",
            props: { text: "isActive", htmlFor: "sliderIsActiveName", required: true }
          },
          {
            id: "sliderIsActiveName",
            name: "toggleInput",
            props: { name: "isActive", className: "mb-4", required: true }
          },

          {
            id: "sliderImageLabel",
            name: "label",
            props: { text: "isActive", htmlFor: "sliderImageName", required: true }
          },
          {
            id: "sliderImageName",
            name: "input",
            props: { name: "image", className: "mb-4", required: true, type: "file" }
          }
        ]}
        addDataEndpoint="/api/v1/sliders/create"
        editDataEndpoint="/api/v1/sliders/update"
        paginateDataEndpoint="/api/v1/sliders"
        deleteDataEndpoint="/api/v1/sliders/remove"
      />
    </SuperAdminLayout>
  );
}

export default Slider;
