"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { useState } from "react";
import { bookingStatus, bookingStatusOptions } from "@/constants/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Cities() {
  const [status, setStatus] = useState<bookingStatus | "">("");

  return (
    <SuperAdminLayout title="Cities">
      <TableHOC
        searchKey="vendorName"
        usePagination
        addable={false}
        editable={false}
        deleteable={false}
        columns={[
          { accessorKey: "vendorName", header: "Vendor Name" },
          { accessorKey: "vendorPhone", header: "Phone" },
          { accessorKey: "vendorEmail", header: "Vendor Email" },
          { accessorKey: "status", header: "Status" },
          {
            accessorKey: "serviceOfferedPrice",
            header: "Price",
            accessorFn: (data) => "₹ " + data.serviceOfferedPrice
          },
          {
            accessorKey: "bookingDate",
            header: "booking Date",
            accessorFn: (data) => dayjs(data.createdAt).format("DD-MM-YYYY HH:mm A")
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
        paginateDataEndpoint={
          "/api/v1/booking/all" + (status && status !== bookingStatus.NONE ? "?status=" + status : "")
        }
        headingExtra={
          <div className="min-w-44">
            <Select onValueChange={(value) => setStatus(value as bookingStatus)}>
              <SelectTrigger>
                <SelectValue>{status || "Select Status"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {bookingStatusOptions.map((bookingStatus) => (
                  <SelectItem value={bookingStatus} key={bookingStatus}>
                    {bookingStatus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />
    </SuperAdminLayout>
  );
}

export default Cities;
