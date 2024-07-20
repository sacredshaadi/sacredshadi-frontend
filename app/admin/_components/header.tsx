import { Dispatch, ReactNode, SetStateAction } from "react";
import { Menu } from "lucide-react";
import { twMerge } from "tailwind-merge";

function AdminHeader(props: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  extras: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-white py-4">
      <div
        className={twMerge("flex items-center justify-between", props.collapsed ? "w-16 justify-center" : "w-56 pl-4")}
      >
        {!props.collapsed ? <div>Sacred Shadi</div> : null}
        <Menu className="h-8 w-8 cursor-pointer" onClick={() => props.setCollapsed((prev) => !prev)} />
      </div>

      <div className="mx-2 flex flex-grow items-center justify-between sm:mx-4">
        {props.extras}
        <div>Settings</div>
      </div>
    </div>
  );
}

export default AdminHeader;
