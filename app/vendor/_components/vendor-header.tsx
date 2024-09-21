import { Dispatch, ReactNode, SetStateAction } from "react";
import { Menu } from "lucide-react";
import ProfileComponent from "@/app/_components/profile";
import { userAuthTypes } from "@/types";
import { Logo } from "@/components/globals/logo";
import { cn } from "@/lib/utils";

function VendorHeader(props: {
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
          <ProfileComponent type={userAuthTypes.vendor} />
        </section>
      </div>
    </div>
  );
}

export default VendorHeader;
