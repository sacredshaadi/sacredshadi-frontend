import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsEnum } from '@/types';

export default function TabsDemo() {
  return (
    <Tabs defaultValue="home" className="hidden sm:block">
      <TabsList className="gap-2">
        {Object.entries(TabsEnum).map(([key, val]) => (
          <TabsTrigger value={key}>{val}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
