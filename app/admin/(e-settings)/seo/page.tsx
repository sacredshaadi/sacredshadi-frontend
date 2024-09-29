"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../../_components/adminLayout";
import TableHOC from "../../_components/tableHoc";

function SeoSettings() {
  return (
    <SuperAdminLayout title="SEO Settings">
      <TableHOC
        searchKey="metaTitle"
        addable
        editable
        deleteable
        columns={[
          { accessorKey: "url", header: "URL" },
          { accessorKey: "metaTitle", header: "Meta Title" },
          { accessorKey: "metaDescription", header: "Meta Description" },
          { accessorKey: "metaKeywords", header: "Meta Keywords" },
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
            id: "seoUrlLabel",
            name: "label",
            props: { text: "URL", htmlFor: "seoUrlName", required: true }
          },
          { id: "seoUrlName", name: "input", props: { name: "seoUrl", className: "mb-4", required: true } },
          {
            id: "seoMetaTitleLabel",
            name: "label",
            props: { text: "Meta Title", htmlFor: "seoMetaTitleName", required: true }
          },
          {
            id: "seoMetaTitleName",
            name: "textAreaInput",
            props: { name: "metaTitle", className: "mb-4", required: true }
          },
          {
            id: "seoMetaDescriptionLabel",
            name: "label",
            props: { text: "Meta Description", htmlFor: "seoMetaDescriptionName", required: true }
          },
          {
            id: "seoMetaDescriptionName",
            name: "textAreaInput",
            props: { name: "metaDescription", className: "mb-4", required: true }
          },
          {
            id: "seoMetaKeywordsLabel",
            name: "label",
            props: { text: "Meta Keywords", htmlFor: "seoMetaKeywordsName", required: true }
          },
          {
            id: "seoMetaKeywordsName",
            name: "textAreaInput",
            props: { name: "metaKeywords", className: "mb-4", required: true }
          }
        ]}
        addDataEndpoint="/api/v1/seo/create"
        editDataEndpoint="/api/v1/seo/update"
        paginateDataEndpoint="/api/v1/seo/all"
        deleteDataEndpoint="/api/v1/seo/remove"
      />
    </SuperAdminLayout>
  );
}

export default SeoSettings;
