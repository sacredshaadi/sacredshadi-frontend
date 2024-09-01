import { Dispatch, ReactNode, SetStateAction } from "react";
import { Menu } from "lucide-react";
import { twMerge } from "tailwind-merge";
import ProfileComponent from "@/app/_components/profile";
import NotificationComp from "@/app/admin/_components/notification-comp";
import MessagesComp from "@/app/admin/_components/messages-comp";
import { userAuthTypes } from "@/types";
import VendorSettings from "./vendor-settings-sheet";
import { HeartFilledIcon } from "@radix-ui/react-icons";

function VendorHeader(props: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  extras: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-primary-foreground py-4">
      <div
        className={twMerge(
          "flex items-center justify-between",
          props.collapsed ? "w-16 justify-center" : "w-56 pl-4",
          "font-semibold text-primary"
        )}
      >
        {!props.collapsed ? (
          <div className="flex items-center justify-center gap-2">
            <HeartFilledIcon className="h-6 w-6 text-primary" />
            <span>Sacred Shadi</span>
          </div>
        ) : null}
        <Menu className="h-8 w-8 cursor-pointer" onClick={() => props.setCollapsed((prev) => !prev)} />
      </div>

      <div className="mx-2 flex flex-grow items-center justify-between sm:mx-4">
        {props.extras}
        <section className="flex items-center gap-2">
          <MessagesComp />
          <NotificationComp />
          <ProfileComponent type={userAuthTypes.vendor} />
          <VendorSettings />
        </section>
      </div>
    </div>
  );
}

export default VendorHeader;
