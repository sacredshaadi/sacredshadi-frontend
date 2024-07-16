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

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-1 flex-col items-center space-y-4 p-4 md:p-8">
        <section
          className=" relative flex w-full flex-col items-center justify-center gap-8 overflow-visible p-4 sm:w-4/5 lg:w-3/5 lg:flex-row
        "
        >
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
          <Button
            className="lg:absolute lg:right-[-10rem] lg:my-auto"
            size={'lg'}
          >
            Get started
          </Button>
        </section>
        <VendorWrapper />
      </div>
    </ScrollArea>
  );
}
