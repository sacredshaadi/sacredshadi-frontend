import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routeMapper } from "@/types";
import Link from "next/link";

export default function TabsDemo() {
  return (
    <Tabs className="hidden bg-transparent sm:block">
      <TabsList className="gap-2 bg-transparent">
        {Object.entries(routeMapper).map(([key, val]) => (
          <Link key={key} href={`${val}`}>
            <TabsTrigger
              value={key}
              key={key}
              className="!focus:bg-red-300 border-2 border-transparent bg-transparent font-semibold transition data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              {key}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
