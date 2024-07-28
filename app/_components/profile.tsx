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
import { useCallback, useEffect } from "react";
import { User, Vendor } from "@/types/auth.types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAuthType, userAuthTypes } from "@/types";
import { useVendorContext } from "../context/vendor-context";
import { useVendorProfileMutation } from "@/components/api";
import { toast } from "@/components/ui/use-toast";

export default function Profile(props: { type: UserAuthType }) {
  const router = useRouter();
  const { setUser, setVendor, setSuperAdmin, ...users } = useUserStore();
  const { mutate: getVendorProfileFn } = useVendorProfileMutation();

  const setCurrentUser = (currentUser: any | null) => {
    if (props.type === userAuthTypes.super_admin) setSuperAdmin(currentUser);
    else if (props.type === userAuthTypes.vendor) setVendor(currentUser);
    else setUser(currentUser);
  };

  useEffect(() => {
    if (!useUserStore.persist?.hasHydrated()) useUserStore.persist.rehydrate();
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    router.replace(props.type === userAuthTypes.super_admin ? "/admin/login" : "/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  if (!props.type) throw new Error("Please specify auth type for ProfileComponent");

  useEffect(() => {
    if (props.type !== userAuthTypes.vendor) return;
    if (!users.vendor) handleLogout();
    else if (users?.vendor?.vendorType) return;
    getVendorProfileFn(users.vendor?.tokens?.accessToken || "", {
      onSuccess: (data) => {
        console.log("vendorprofile: ", data);
        const tokens = users.vendor?.tokens;
        setVendor({ ...data.data, tokens } as Vendor);
        toast({
          variant: "default",
          description: "Vendor profile fetched successfully"
        });
      },
      onError: (error) => {
        console.error("Error fetching vendor profile: ", error);
        toast({
          variant: "destructive",
          description: (error as any).error || error.message || "Error fetching vendor profile"
        });
      }
    });
  }, [users.vendor]);

  if (!useUserStore.persist?.hasHydrated()) {
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
