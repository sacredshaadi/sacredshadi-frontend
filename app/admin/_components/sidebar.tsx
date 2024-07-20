import { LucideIcon, CircleDotDashed, AlignLeft } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { useGetVendorTypesQuery } from "./apis";

type AdminSidebarItem = {
  icon: LucideIcon;
  label: string;
} & ({ route: string } | { subRoutes: Array<Omit<AdminSidebarItem, "icon">> });

function SuperAdminSidebar(props: { collapsed: boolean }) {
  const { data, isLoading } = useGetVendorTypesQuery();
  const adminSidebarRoutes: Array<AdminSidebarItem> = [
    { icon: CircleDotDashed, label: "Dashboard", route: "/admin/dashboard" },
    { icon: AlignLeft, label: "Vendors", route: "/admin/vendors" },
    { icon: AlignLeft, label: "Vendor Types", route: "/admin/vendor-types" },
    { icon: AlignLeft, label: "Users", route: "/admin/users" },
    {
      icon: AlignLeft,
      label: "E Settings",
      subRoutes: [
        { label: "Contacts", route: "/admin/settings/contacts" },
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
    { icon: AlignLeft, label: "Questions", subRoutes: [] },
    { icon: AlignLeft, label: "Services", subRoutes: [] },
    { icon: AlignLeft, label: "User Reviews", route: "/admin/reviews" }
  ];

  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 overflow-auto overflow-x-hidden bg-white p-2 shadow-lg",
        props.collapsed ? "w-16" : "w-56"
      )}
    >
      {adminSidebarRoutes.map((sidebarRoute) => {
        if ("route" in sidebarRoute) {
          return (
            <Link
              key={sidebarRoute.label}
              href={sidebarRoute.route}
              className={twMerge("flex items-center gap-2", props.collapsed ? "justify-center" : "")}
            >
              <sidebarRoute.icon size={26} stroke="red" />
              {!props.collapsed ? <div>{sidebarRoute.label}</div> : null}
            </Link>
          );
        }

        return (
          <div
            key={sidebarRoute.label}
            className={twMerge("flex items-center gap-2", props.collapsed ? "justify-center" : "")}
          >
            <sidebarRoute.icon size={26} stroke="red" />
            {!props.collapsed ? <div>{sidebarRoute.label}</div> : null}
          </div>
        );
      })}
    </div>
  );
}

export default SuperAdminSidebar;
