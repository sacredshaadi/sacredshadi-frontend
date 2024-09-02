"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../../_components/adminLayout";
import TableHOC from "../../_components/tableHoc";

function ContactSettings() {
  return (
    <SuperAdminLayout title="Contacts">
      <TableHOC
        searchKey="contactAddress"
        addable
        editable
        deleteable
        columns={[
          { accessorKey: "contactAddress", header: "Address" },
          { accessorKey: "contactPhone", header: "Phone" },
          { accessorKey: "footerText", header: "Footer Text" },
          { accessorKey: "facebookUrl", header: "Facebook" },
          { accessorKey: "instagramUrl", header: "Instagram" },
          { accessorKey: "twitterUrl", header: "Twitter" },
          { accessorKey: "youtubeUrl", header: "Youtube" },
          { accessorKey: "pinterestUrl", header: "Pinterest" },
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
            id: "contactAddressLabel",
            name: "label",
            props: { text: "Contact Address", htmlFor: "contactAddressName", required: true }
          },
          {
            id: "contactAddressName",
            name: "input",
            props: { name: "contactAddress", className: "mb-4", required: true }
          },

          {
            id: "contactPhoneLabel",
            name: "label",
            props: { text: "Contact Phone", htmlFor: "contactPhoneName", required: true }
          },
          {
            id: "contactPhoneName",
            name: "input",
            props: { name: "contactPhone", className: "mb-4", required: true }
          },

          {
            id: "contactFooterTextLabel",
            name: "label",
            props: { text: "Contact Footer Text", htmlFor: "contactFooterTextName", required: true }
          },
          {
            id: "contactFooterTextName",
            name: "input",
            props: { name: "footerText", className: "mb-4", required: true }
          },

          {
            id: "contactFacebookUrlLabel",
            name: "label",
            props: { text: "Contact Facebook Url", htmlFor: "contactFacebookUrlName", required: true }
          },
          {
            id: "contactFacebookUrlName",
            name: "input",
            props: { name: "facebookUrl", className: "mb-4", required: true }
          },

          {
            id: "contactInstagramUrlLabel",
            name: "label",
            props: { text: "Contact Instagram Url", htmlFor: "contactInstagramUrlName", required: true }
          },
          {
            id: "contactInstagramUrlName",
            name: "input",
            props: { name: "instagramUrl", className: "mb-4", required: true }
          },

          {
            id: "contactTwitterUrlLabel",
            name: "label",
            props: { text: "Contact Twitter Url", htmlFor: "contactTwitterUrlName", required: true }
          },
          {
            id: "contactTwitterUrlName",
            name: "input",
            props: { name: "twitterUrl", className: "mb-4", required: true }
          },

          {
            id: "contactYoutubeUrlLabel",
            name: "label",
            props: { text: "Contact Youtube Url", htmlFor: "contactYoutubeUrlName", required: true }
          },
          {
            id: "contactYoutubeUrlName",
            name: "input",
            props: { name: "youtubeUrl", className: "mb-4", required: true }
          },

          {
            id: "contactPinterestUrlLabel",
            name: "label",
            props: { text: "Contact Pinterest Url", htmlFor: "contactPinterestUrlName", required: true }
          },
          {
            id: "contactPinterestUrlName",
            name: "input",
            props: { name: "pinterestUrl", className: "mb-4", required: true }
          }
        ]}
        addDataEndpoint="/api/v1/contact/create"
        editDataEndpoint="/api/v1/contact/update"
        paginateDataEndpoint="/api/v1/contact/all"
        deleteDataEndpoint="/api/v1/contact/remove"
      />
    </SuperAdminLayout>
  );
}

export default ContactSettings;
