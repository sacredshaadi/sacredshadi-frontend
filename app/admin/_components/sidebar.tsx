import Link from "next/link";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { useGetVendorTypesQuery } from "./apis";
import { getAdminSidebarRoutes } from "./sidebarItems";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SuperAdminSidebar(props: { collapsed: boolean; vendorSide?: boolean }) {
  const { data, isLoading } = useGetVendorTypesQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sidebarItems = useMemo(() => getAdminSidebarRoutes(isLoading, data?.data), [isLoading]);

  return (
    <div
      className={twMerge(
        "flex h-full flex-col gap-4 overflow-auto overflow-x-hidden bg-background p-2 shadow-lg",
        props.collapsed ? "w-16" : "w-56"
      )}
    >
      {sidebarItems.map((sidebarRoute) => {
        if (sidebarRoute.route) {
          return (
            <Link
              key={sidebarRoute.label}
              href={sidebarRoute.route}
              className={twMerge(
                "flex items-center gap-2 rounded-md py-0.5 transition",
                props.collapsed ? "justify-center" : ""
              )}
            >
              <sidebarRoute.icon size={26} stroke="rgb(225, 29, 72)" />
              {!props.collapsed ? <div className="text-base">{sidebarRoute.label}</div> : null}
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
                <AccordionTrigger className="flex items-center justify-start gap-2 py-0.5 hover:no-underline">
                  {<sidebarRoute.icon size={26} stroke="rgb(225, 29, 72)" />}
                  {!props.collapsed ? <div className="text-base">{sidebarRoute.label}</div> : null}
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
