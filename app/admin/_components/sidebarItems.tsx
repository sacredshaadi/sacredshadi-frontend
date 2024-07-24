import { VendorType } from "@/types/auth.types";
import { PersonIcon } from "@radix-ui/react-icons";
import { LucideIcon, CircleDotDashed, AlignLeft, PersonStandingIcon } from "lucide-react";

export type AdminSidebarItem = {
  icon: LucideIcon;
  label: string;
  route?: string;
  subRoutes?: Array<Omit<AdminSidebarItem, "icon">>;
};

export function getAdminSidebarRoutes(
  isLoading: boolean,
  vendorSide?: boolean,
  data?: Array<VendorType>
): Array<AdminSidebarItem> {
  const base = vendorSide ? "/vendor" : "/admin";

  const adminRoutes = [
    { icon: CircleDotDashed, label: "Dashboard", route: "/admin/dashboard" },
    { icon: AlignLeft, label: "Vendors", route: "/admin/vendors" },
    { icon: AlignLeft, label: "Vendor Types", route: "/admin/vendor-types" },
    { icon: AlignLeft, label: "Users", route: "/admin/users" },
    {
      icon: AlignLeft,
      label: "E Settings",
      subRoutes: [
        { label: "Contacts", route: "/admin/contacts" },
        { label: "Our Team", route: "/admin/our-team" },
        { label: "Profile", route: "/admin/profile" },
        { label: "SEO", route: "/admin/seo" }
      ]
    },
    { icon: AlignLeft, label: "City", route: "/admin/cities" },
    { icon: AlignLeft, label: "Slider", route: "/admin/slider" },
    { icon: AlignLeft, label: "Categories", route: "/admin/categories" },
    { icon: AlignLeft, label: "Quiz", route: "/admin/quiz" },
    { icon: AlignLeft, label: "Quiz MCQ", route: "/admin/quiz-mcq" },
    { icon: AlignLeft, label: "Hangouts Quiz", route: "/admin/hangout-quiz" },
    {
      icon: AlignLeft,
      label: "Questions",
      subRoutes: !isLoading
        ? data?.map((vendorType) => ({
            label: vendorType.type,
            route: `/admin/questions/${vendorType.id}`
          }))
        : []
    },
    {
      icon: AlignLeft,
      label: "Services",
      subRoutes: !isLoading
        ? data?.map((vendorType) => ({
            label: vendorType.type,
            route: `/admin/services/${vendorType.id}`
          }))
        : []
    },
    { icon: AlignLeft, label: "User Reviews", route: "/admin/reviews" }
  ];

  const vendorRoutes = [
    { icon: PersonStandingIcon, label: "Profile", subRoutes: [{ label: "Edit Profile", route: "/vendor/profile" }] },
    { icon: AlignLeft, label: "Service Type", route: "/vendor/service-type" },
    { icon: AlignLeft, label: "Function Type", route: "/vendor/function-type" },
    { icon: AlignLeft, label: "Package", route: "/vendor/package" },
    { icon: AlignLeft, label: "Additional Details", route: "/vendor/additional-details" },
    { icon: AlignLeft, label: "Portfolio List", route: "/vendor/portfolio-list" },
    { icon: AlignLeft, label: "Booking", route: "/vendor/booking" },
    { icon: AlignLeft, label: "Feedback", route: "/vendor/feedback" }
  ];

  return vendorSide ? vendorRoutes : adminRoutes;
}
