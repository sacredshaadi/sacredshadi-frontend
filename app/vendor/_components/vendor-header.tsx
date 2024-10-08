import { Dispatch, ReactNode, SetStateAction } from "react";
import { Menu } from "lucide-react";
import ProfileComponent from "@/app/_components/profile";
import { userAuthTypes } from "@/types";
import { Logo } from "@/components/globals/logo";
import { cn } from "@/lib/utils";
import VendorRouteDrawer from "./vendor-route-drawer";

function VendorHeader(props: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  extras: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-primary-foreground py-4">
      <div
        className={cn(
          "hidden w-16 items-center justify-between font-semibold text-primary sm:flex",
          props.collapsed ? "justify-center" : "pl-4 sm:w-56"
        )}
      >
        {!props.collapsed ? <Logo /> : null}
        <Menu className="h-8 w-8 cursor-pointer" onClick={() => props.setCollapsed((prev) => !prev)} />
      </div>
      <div className="flex items-center justify-center sm:hidden">
        <VendorRouteDrawer />
      </div>

      <div className="mx-2 flex flex-grow items-center justify-between sm:mx-4">
        {props.extras}
        <section className="flex items-center gap-2">
          <ProfileComponent type={userAuthTypes.vendor} />
        </section>
      </div>
    </div>
  );
}

export default VendorHeader;
