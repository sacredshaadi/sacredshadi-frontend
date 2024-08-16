import { VendorType } from "@/types/auth.types";
import {
  Cog,
  Star,
  Users,
  UserCog,
  Replace,
  Building,
  AlignLeft,
  ImagePlus,
  BoxSelect,
  LucideIcon,
  DatabaseZap,
  MailQuestion,
  GraduationCap,
  CircleDotDashed,
  MailQuestionIcon
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
        { label: "Profile", route: "/admin/profile" },
        { label: "SEO", route: "/admin/seo" }
      ]
    },
    { icon: Building, label: "City", route: "/admin/cities" },
    { icon: ImagePlus, label: "Slider", route: "/admin/slider" },
    { icon: BoxSelect, label: "Categories", route: "/admin/categories" },
    { icon: GraduationCap, label: "Quiz", route: "/admin/quiz" },
    { icon: MailQuestion, label: "Quiz MCQ", route: "/admin/quiz-mcq" },
    { icon: Replace, label: "Hangouts Quiz", route: "/admin/hangout-quiz" },
    {
      icon: MailQuestionIcon,
      label: "Questions",
      subRoutes: !isLoading
        ? data?.map((vendorType) => ({
            label: vendorType.type,
            route: `/admin/questions/${vendorType.id}`
          }))
        : []
    },
    {
      icon: DatabaseZap,
      label: "Services",
      subRoutes: !isLoading
        ? data?.map((vendorType) => ({ label: vendorType.type, route: `/admin/services/${vendorType.id}` }))
        : []
    },
    { icon: Star, label: "User Reviews", route: "/admin/reviews" }
  ];

  return adminRoutes;
}
