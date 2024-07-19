import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { routeMapper } from '@/types';
import Link from 'next/link';

export default function TabsDemo() {
  return (
    <Tabs defaultValue="home" className="hidden sm:block">
      <TabsList className="gap-2">
        {Object.entries(routeMapper).map(([key, val]) => (
          <TabsTrigger value={key} key={key}>
            <Link href={`${val}`}>{key}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
