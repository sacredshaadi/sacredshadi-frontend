import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { routeMapper } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabsDemo() {
  return (
    <Tabs className="hidden sm:block">
      <TabsList className="gap-2">
        {Object.entries(routeMapper).map(([key, val]) => (
          <Link href={`${val}`}>
            <TabsTrigger value={key} key={key} className="!focus:bg-red-300">
              {key}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
