"use client";

import { PropsWithChildren, ReactNode, useState } from "react";
import { SuperAdminSidebar } from "./sidebar";
import AdminHeader from "./header";

export function SuperAdminLayout(
  props: PropsWithChildren<{ title: string; vendorSide?: boolean; extras?: ReactNode }>
) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-screen flex-col bg-gray-100 ">
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
      <div className="flex flex-grow overflow-auto">
        <SuperAdminSidebar {...{ collapsed }} />
        <div className="m-2 mb-0 flex-grow overflow-auto rounded-sm sm:m-4 sm:mb-0">{props.children}</div>
      </div>
    </div>
  );
}
