"use client";

import { PersonIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/app/context/user-context";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/auth.types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAuthType } from "@/types";

type ProfileComponentProps = {
  type: UserAuthType;
};

export default function Profile(props: ProfileComponentProps) {
  const router = useRouter();
  const { setUser, setVendor, setSuperAdmin, ...users } = useUserStore();

  const setCurrentUser = (currentUser: User | null) => {
    if (props.type === "super_admin") setSuperAdmin(currentUser);
    else if (props.type === "vendor") setVendor(currentUser);
    else setUser(currentUser);
  };

  useEffect(() => {
    if (!useUserStore.persist.hasHydrated()) useUserStore.persist.rehydrate();
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    router.replace("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  if (!props.type) throw new Error("Please specify auth type for ProfileComponent");

  if (!useUserStore.persist.hasHydrated()) {
    return (
      <Button variant={"outline"} size={"icon"}>
        <Loader2 className="h-4 animate-spin" />
      </Button>
    );
  }

  if (!users[props.type]) {
    return (
      <Button variant="outline" onClick={() => router.push("/login")}>
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <PersonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
