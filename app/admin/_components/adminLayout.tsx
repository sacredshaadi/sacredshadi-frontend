"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import AdminHeader from "./header";
import { SuperAdminSidebar } from "./sidebar";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";

export function SuperAdminLayout(props: PropsWithChildren<{ title: string; extras?: ReactNode }>) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { super_admin } = useUserStore();
  const [loading, setLoading] = useState(true);

  useUserStore.persist.onFinishHydration((data) => {
    if (!data.super_admin) router.replace("/login");
    else setLoading(false);
  });

  useEffect(() => {
    if (!useUserStore.persist.hasHydrated()) useUserStore.persist.rehydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) setLoading(false);
  }, [super_admin]);

  if (loading) {
    // TODO: Better loading UI
    return <div className="h-screen bg-background">Loading...</div>;
  }

  return (
    <div className="h-screen bg-background">
      <AdminHeader
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
      <div className="flex h-[calc(100vh-68px)]">
        <SuperAdminSidebar {...{ collapsed }} />
        <div className="m-2 mb-0 flex-grow overflow-y-auto rounded-sm sm:m-4 sm:mb-0">{props.children}</div>
      </div>
    </div>
  );
}
