"use client";

import React from "react";
import { AddDialog } from "../_components/vendor-route-wrapper/add-modal";
import { useGetVendorAllSubTypesMutation } from "@/components/api";

const ServiceModal = () => {
  return (
    <nav className="mb-6 flex items-center justify-between">
      <AddDialog useMutation={useGetVendorAllSubTypesMutation} />
    </nav>
  );
};

export default ServiceModal;
