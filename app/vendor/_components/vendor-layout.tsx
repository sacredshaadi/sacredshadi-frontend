"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import VendorHeader from "./vendor-header";
import { getVendorSidebarRoutes } from "./sidebarItems";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";
import { VendorSidebar } from "./vendor-sidebar";

export function VendorLayout(props: PropsWithChildren<{ title: string; extras?: ReactNode }>) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { vendor } = useUserStore();
  const [loading, setLoading] = useState(true);

  useUserStore.persist?.onFinishHydration((data) => {
    if (!data.vendor) router.replace("/login");
    else setLoading(false);
  });

  useEffect(() => {
    if (!useUserStore.persist?.hasHydrated()) useUserStore.persist.rehydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (useUserStore.persist?.hasHydrated()) setLoading(false);
  }, [vendor]);

  if (loading) {
    // TODO: Better loading UI
    return <div className="h-screen bg-background">Loading...</div>;
  }

  return (
    <div className="h-screen bg-background">
      <VendorHeader
        {...{
          collapsed,
          setCollapsed,
          extras: (
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">{props.title}</h1>
              {props.extras}
            </div>
          )
        }}
      />
      <div className="flex h-[calc(100vh-68px)] ">
        <VendorSidebar {...{ collapsed }} />
        <div className="m-2 mb-0 flex-grow overflow-y-auto rounded-sm p-4 sm:m-4 sm:mb-0">{props.children}</div>
      </div>
    </div>
  );
}
