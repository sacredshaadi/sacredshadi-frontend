import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "../mobile-sidebar";
import Profile from "@/app/_components/profile";
import { Heart } from "lucide-react";
import TabsDemo from "./Tabs/test";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 left-0 right-0 top-0 z-20 flex flex-col gap-0 border-b bg-background/95 backdrop-blur">
      <section className="flex h-14 items-center justify-between border-b px-4">
        <div className="hidden lg:block">
          <span className="text-sm font-light">India&apos;s Favourite Wedding Planning Platform</span>
        </div>

        <div className="flex items-center gap-2">
          <Profile type="user" />
          <ThemeToggle />
        </div>
      </section>
      <nav className="flex items-center justify-between overflow-x-auto p-4">
        <section className="flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 dark:text-white" />
          <span>Sacred Shaadi</span>
        </section>

        <TabsDemo />
        <div className={cn("block sm:!hidden")}>
          <MobileSidebar />
        </div>
      </nav>
    </div>
  );
}
