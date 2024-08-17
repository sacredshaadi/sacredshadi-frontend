import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MessageSquare } from "lucide-react";
import React from "react";

const MessagesComp = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="flex items-center justify-center p-2" variant={"outline"} title="Notifications">
          <MessageSquare className="h-4 w-4 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Messages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2 text-sm">No new messages</div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        // onClick={() => {}}
        >
          View all messages
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessagesComp;
