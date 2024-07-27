import { SuperAdminLayout } from "../_components/adminLayout";
import AdminDashboardCards from "../_components/adminDashboard";

function AdminDashboard() {
  return (
    <SuperAdminLayout title="Dashboard">
      <AdminDashboardCards />
    </SuperAdminLayout>
  );
}

export default AdminDashboard;
