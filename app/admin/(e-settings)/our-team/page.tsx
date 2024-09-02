"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../../_components/adminLayout";
import TableHOC from "../../_components/tableHoc";
import { ErrorBoundary } from "@/components/errorBoundary";
import Image from "next/image";

function OurTeamSettings() {
  return (
    <SuperAdminLayout title="Our Team">
      <TableHOC
        searchKey="name"
        addable
        editable
        deleteable
        columns={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "description", header: "Description" },
          { accessorKey: "role", header: "Role" },
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
            id: "teamMemberNameLabel",
            name: "label",
            props: { text: "Name", htmlFor: "teamMemberName", required: true }
          },
          { id: "teamMemberName", name: "input", props: { name: "name", className: "mb-4", required: true } },
          {
            id: "teamMemberDescriptionLabel",
            name: "label",
            props: { text: "Description", htmlFor: "teamMemberDescription", required: true }
          },
          {
            id: "teamMemberDescription",
            name: "input",
            props: { name: "description", className: "mb-4", required: true }
          },
          {
            id: "teamMemberRoleLabel",
            name: "label",
            props: { text: "Role", htmlFor: "teamMemberRole", required: true }
          },
          { id: "teamMemberRole", name: "input", props: { name: "role", className: "mb-4", required: true } },
          {
            id: "teamMemberImageLabel",
            name: "label",
            props: { text: "Image", htmlFor: "teamMemberImage", required: true }
          },
          {
            id: "teamMemberImage",
            name: "imageInput",
            props: { name: "image", className: "mb-4", required: true }
          }
        ]}
        addDataEndpoint="/api/v1/team/create"
        editDataEndpoint="/api/v1/team/update"
        paginateDataEndpoint="/api/v1/team/all"
        deleteDataEndpoint="/api/v1/team/remove"
      />
    </SuperAdminLayout>
  );
}

export default OurTeamSettings;
