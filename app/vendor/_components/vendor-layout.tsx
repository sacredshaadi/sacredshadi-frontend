"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import VendorHeader from "./vendor-header";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";
import { VendorSidebar } from "./vendor-sidebar";
import { Loading } from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function VendorLayout(
  props: PropsWithChildren<{ title: string; extras?: ReactNode; hideNextBtn?: boolean; nextBtnLink?: string }>
) {
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

  if (loading) return <Loading className="h-96" />;
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
      <div className="flex h-[calc(100vh-68px)] w-full justify-between">
        <VendorSidebar {...{ collapsed }} />
        <div className="m-2 mb-0 flex flex-1 flex-col items-center justify-between gap-4 overflow-y-auto rounded-sm p-4 sm:m-4 sm:mb-0">
          <section className="w-full">{props.children}</section>

          {!props.hideNextBtn && (
            <section className="flex w-full flex-row-reverse px-4">
              <Button
                variant="default"
                size="sm"
                className="ml-auto mt-auto p-4 text-base font-semibold shadow-lg lg:p-6"
                asChild
              >
                <Link href={props.nextBtnLink ?? "/vendor"}>
                  <span>Next Step</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
