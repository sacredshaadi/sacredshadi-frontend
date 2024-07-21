import SuperAdminLayout from "../_components/layout";
import TableHOC from "../_components/tableHoc";

function VendorTypes() {
  return (
    <SuperAdminLayout title="Vendor types">
      <TableHOC
        columns={[]}
        deleteDataEndpoint=""
        editDataEndpoint=""
        paginateDataEndpoint=""
        tableTitle="Vendor Types"
      />
    </SuperAdminLayout>
  );
}

export default VendorTypes;
