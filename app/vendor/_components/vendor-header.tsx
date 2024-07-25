import { Dispatch, ReactNode, SetStateAction } from "react";
import { Menu, Settings } from "lucide-react";
import { twMerge } from "tailwind-merge";
import ProfileComponent from "@/app/_components/profile";
import NotificationComp from "@/app/admin/_components/notification-comp";
import { Button } from "@/components/ui/button";
import MessagesComp from "@/app/admin/_components/messages-comp";

function VendorHeader(props: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  extras: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-background py-4 dark:text-white">
      <div
        className={twMerge("flex items-center justify-between", props.collapsed ? "w-16 justify-center" : "w-56 pl-4")}
      >
        {!props.collapsed ? <div>Sacred Shadi</div> : null}
        <Menu className="h-8 w-8 cursor-pointer" onClick={() => props.setCollapsed((prev) => !prev)} />
      </div>

      <div className="mx-2 flex flex-grow items-center justify-between sm:mx-4">
        {props.extras}
        <section className="flex items-center gap-2">
          <MessagesComp />
          <NotificationComp />
          <ProfileComponent type={"super_admin"} />
          <Button className="flex items-center justify-center rounded-full p-2" title="Settings" variant={"outline"}>
            <Settings className="h-4 w-4 cursor-pointer" />
          </Button>
        </section>
      </div>
    </div>
  );
}

export default VendorHeader;
