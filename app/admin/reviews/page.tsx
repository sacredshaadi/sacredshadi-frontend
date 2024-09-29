"use client";

import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";

function Reviews() {
  return (
    <SuperAdminLayout title="Reviews">
      <TableHOC
        searchKey="title"
        usePagination
        addable={false}
        editable={false}
        deleteable={false}
        columns={[
          { accessorKey: "vendorName", header: "Vendor Name" },
          { accessorKey: "rating", header: "Rating" },
          { accessorKey: "userName", header: "User" },
          { accessorKey: "feedback", header: "Feedback" }
        ]}
        paginateDataEndpoint="/api/v1/feedback/all"
      />
    </SuperAdminLayout>
  );
}

export default Reviews;
