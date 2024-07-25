import { Menu } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Profile from "@/app/_components/profile";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";

function AdminHeader(props: {
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
        <div className="flex items-center gap-2">
          <div>Settings</div>
          <Profile type="super_admin" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
