"use client";

import { useParams } from "next/navigation";
import { SuperAdminLayout } from "../../_components/adminLayout";

function SpecificServiceDetails() {
  const params = useParams();

  return (
    <SuperAdminLayout title="Service Details">
      <h1>Specific Service Details for serviceID: {params.serviceId}</h1>
    </SuperAdminLayout>
  );
}

export default SpecificServiceDetails;
