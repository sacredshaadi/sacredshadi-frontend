import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useGetVendorTypesQuery } from "./apis";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getAdminSidebarRoutes } from "./sidebarItems";
import { useMemo } from "react";

function SuperAdminSidebar(props: { collapsed: boolean }) {
  const { data, isLoading } = useGetVendorTypesQuery();

  const sidebarItems = useMemo(() => {
    return getAdminSidebarRoutes(isLoading, data?.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 overflow-auto overflow-x-hidden bg-white p-2 shadow-lg",
        props.collapsed ? "w-16" : "w-56"
      )}
    >
      {sidebarItems.map((sidebarRoute) => {
        if (sidebarRoute.route) {
          return (
            <Link
              key={sidebarRoute.label}
              href={sidebarRoute.route}
              className={twMerge("flex items-center gap-2", props.collapsed ? "justify-center" : "")}
            >
              <sidebarRoute.icon size={26} stroke="red" />
              {!props.collapsed ? <div className="text-base font-semibold">{sidebarRoute.label}</div> : null}
            </Link>
          );
        }

        return (
          <div
            key={sidebarRoute.label}
            className={twMerge("flex items-center gap-2", props.collapsed ? "justify-center" : "")}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={sidebarRoute.label} className="border-none">
                <AccordionTrigger className="flex items-center justify-start gap-2 py-0 hover:no-underline">
                  {<sidebarRoute.icon size={26} stroke="red" />}
                  {!props.collapsed ? <div className="text-base font-semibold">{sidebarRoute.label}</div> : null}
                </AccordionTrigger>
                <AccordionContent className={twMerge("mb-0 pb-0", props.collapsed ? "" : "pl-9")}>
                  {sidebarRoute.subRoutes?.map((subRoute) => (
                    <Link
                      key={subRoute.label}
                      href={subRoute.route!}
                      className="my-2 flex items-center gap-2 text-base"
                    >
                      {subRoute.label}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default SuperAdminSidebar;
