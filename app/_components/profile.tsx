"use client";
import { PersonIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/app/context/user-context";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/auth.types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type CompProps = {};
export default function ProfileComponent({}: CompProps) {
  const setUser = useUserContext((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const user = useUserContext((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    try {
      if (user?.tokens?.accessToken) return;
      setLoading(true);
      const currUser = localStorage.getItem("user") || "";
      if (!currUser) {
        throw new Error("User not found");
      }
      // console.log("setting new user --> ", currUser);
      setUser(JSON.parse(currUser).data as User);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.tokens?.accessToken) setLoading(false);
  }, [user]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return (
      <Button variant={"outline"} size={"icon"}>
        <Loader2 className="h-4 animate-spin" />
      </Button>
    );
  } else if (!user)
    return (
      <Button variant={"outline"} onClick={() => router.push("/login")}>
        Login
      </Button>
    );

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
