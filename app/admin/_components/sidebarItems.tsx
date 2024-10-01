import { VendorType } from "@/types/auth.types";
import {
  Cog,
  Star,
  Users,
  UserCog,
  Building,
  AlignLeft,
  ImagePlus,
  Clipboard,
  LucideIcon,
  DatabaseZap,
  CircleDotDashed
} from "lucide-react";

export type AdminSidebarItem = {
  icon: LucideIcon;
  label: string;
  route?: string;
  subRoutes?: Array<Omit<AdminSidebarItem, "icon">>;
};

export function getAdminSidebarRoutes(isLoading: boolean, data?: Array<VendorType>): Array<AdminSidebarItem> {
  const adminRoutes = [
    { icon: CircleDotDashed, label: "Dashboard", route: "/admin/dashboard" },
    { icon: UserCog, label: "Vendors", route: "/admin/vendors" },
    { icon: AlignLeft, label: "Vendor Types", route: "/admin/vendor-types" },
    { icon: Users, label: "Users", route: "/admin/users" },
    {
      icon: Cog,
      label: "E Settings",
      subRoutes: [
        { label: "Contact Us", route: "/admin/contact-us" },
        { label: "Our Team", route: "/admin/our-team" },
        { label: "SEO", route: "/admin/seo" }
      ]
    },
    { icon: Clipboard, label: "Bookings", route: "/admin/bookings" },
    { icon: Building, label: "City", route: "/admin/cities" },
    { icon: ImagePlus, label: "Slider", route: "/admin/slider" },
    {
      icon: DatabaseZap,
      label: "Services",
      subRoutes: !isLoading
        ? data?.map((vendorType) => ({ label: vendorType.type, route: `/admin/services/${vendorType.id}` }))
        : []
    },
    { icon: DatabaseZap, label: "Vendor services", route: "/admin/vendor-services" },
    { icon: Star, label: "User Reviews", route: "/admin/reviews" }
  ];

  return adminRoutes;
}
