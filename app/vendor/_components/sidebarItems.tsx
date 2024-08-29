import { LucideIcon, AlignLeft, PersonStandingIcon } from "lucide-react";

export type SidebarItem = {
  icon: LucideIcon;
  label: string;
  route?: string;
  subRoutes?: Array<Omit<SidebarItem, "icon">>;
};

export function getVendorSidebarRoutes(): Array<SidebarItem> {
  const vendorRoutes = [
    { icon: AlignLeft, label: "Dashboard", route: "/vendor/dashboard" },
    { icon: PersonStandingIcon, label: "Profile", subRoutes: [{ label: "Edit Profile", route: "/vendor/profile" }] },
    { icon: AlignLeft, label: "Service Type", route: "/vendor/service-type" },
    { icon: AlignLeft, label: "Services Offered", route: "/vendor/services-offered" },
    // { icon: AlignLeft, label: "Function Type", route: "/vendor/function-type" },
    // { icon: AlignLeft, label: "Package", route: "/vendor/package" },
    { icon: AlignLeft, label: "Additional Details", route: "/vendor/additional-details" },
    { icon: AlignLeft, label: "Portfolio List", route: "/vendor/portfolio-list" },
    { icon: AlignLeft, label: "Booking", route: "/vendor/booking" },
    { icon: AlignLeft, label: "Feedback", route: "/vendor/feedback" }
  ];

  return vendorRoutes;
}
