import { Dispatch, ReactNode, SetStateAction } from "react";
import { Menu, Settings } from "lucide-react";
import Profile from "@/app/_components/profile";
import NotificationComp from "./notification-comp";
import { Button } from "@/components/ui/button";
import MessagesComp from "./messages-comp";
import { userAuthTypes } from "@/types";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/globals/logo";

function AdminHeader(props: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  extras: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-primary-foreground py-4">
      <div
        className={cn(
          "flex items-center justify-between font-semibold text-primary",
          props.collapsed ? "w-16 justify-center" : "w-56 pl-4"
        )}
      >
        {!props.collapsed ? <Logo /> : null}
        <Menu className="h-8 w-8 cursor-pointer" onClick={() => props.setCollapsed((prev) => !prev)} />
      </div>

      <div className="mx-2 flex flex-grow items-center justify-between sm:mx-4">
        {props.extras}
        <section className="flex items-center gap-2">
          <MessagesComp />
          <NotificationComp />
          <Profile type={userAuthTypes.super_admin} />
          <Button className="flex items-center justify-center rounded-full p-2" title="Settings" variant="outline">
            <Settings className="h-4 w-4 cursor-pointer" />
          </Button>
        </section>
      </div>
    </div>
  );
}

export default AdminHeader;
