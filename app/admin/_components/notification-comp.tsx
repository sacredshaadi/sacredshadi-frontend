import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import React from "react";

const NotificationComp = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className="flex items-center justify-center border-2 border-primary p-2 text-primary transition hover:bg-primary hover:text-white"
          variant={"outline"}
          title="Notifications"
        >
          <Bell className="h-4 w-4 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2 text-sm">No new notifications</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationComp;
