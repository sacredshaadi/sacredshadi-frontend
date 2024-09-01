import {
  LucideIcon,
  AlignLeft,
  PersonStandingIcon,
  LayoutDashboardIcon,
  Bookmark,
  Box,
  List,
  ListChecks,
  BaggageClaim,
  Clipboard,
  TestTubesIcon,
  CheckCircle
} from "lucide-react";

export type SidebarItem = {
  icon: LucideIcon;
  label: string;
  route?: string;
  subRoutes?: Array<Omit<SidebarItem, "icon">>;
};

export function getVendorSidebarRoutes(): Array<SidebarItem> {
  const vendorRoutes = [
    { icon: LayoutDashboardIcon, label: "Dashboard", route: "/vendor/dashboard" },
    { icon: PersonStandingIcon, label: "Profile", subRoutes: [{ label: "Edit Profile", route: "/vendor/profile" }] },
    { icon: Bookmark, label: "Service Type", route: "/vendor/service-type" },
    { icon: Box, label: "Services Offered", route: "/vendor/services-offered" },
    // { icon: AlignLeft, label: "Function Type", route: "/vendor/function-type" },
    // { icon: AlignLeft, label: "Package", route: "/vendor/package" },
    { icon: List, label: "Additional Details", route: "/vendor/additional-details" },
    { icon: ListChecks, label: "Portfolio List", route: "/vendor/portfolio-list" },
    { icon: Clipboard, label: "Booking", route: "/vendor/booking" },
    { icon: CheckCircle, label: "Feedback", route: "/vendor/feedback" }
  ];

  return vendorRoutes;
}
