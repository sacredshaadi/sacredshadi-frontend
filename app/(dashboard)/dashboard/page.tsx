import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SliderComp } from './carousel';
import { DropDownInput } from './input-component';
import { VendorEnum } from '@/types/user-facing';
import { fillerCities } from '@/constants/data';
import VendorWrapper from './vendor-wrapper';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
];

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-1 flex-col items-center space-y-4 p-4 md:p-8">
        <section className="flex w-full items-center justify-center gap-12 overflow-auto p-4 lg:w-4/5 xl:w-3/5">
          <DropDownInput
            list={Object.entries(VendorEnum).map(([key, val]) => ({
              value: key,
              label: val
            }))}
            placeholder="Select Vendor Types"
          />
          <DropDownInput
            list={fillerCities.map((city) => ({
              value: city,
              label: city
            }))}
            placeholder="Select Cities"
          />
        </section>
        <VendorWrapper />
        <VendorWrapper />
        <VendorWrapper />
        <VendorWrapper />
        <VendorWrapper />
        <VendorWrapper />
      </div>
    </ScrollArea>
  );
}
