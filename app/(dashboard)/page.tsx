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
// import { DropDownInput } from './input-component';
import { VendorEnum } from '@/types/user-facing';
import { fillerCities } from '@/constants/data';
import VendorWrapper from '../_components/vendor-wrapper';
import { VendorSelectWrapper } from './input-component';
import CarouselComp from '../_components/dashboard/carousel';

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-1 flex-col items-center space-y-4 py-4 md:py-8">
        <CarouselComp />
        <section
          className=" relative flex w-full flex-col items-center justify-center gap-8 overflow-visible p-4 sm:w-4/5 lg:w-3/5 lg:flex-row
        "
        >
          <VendorSelectWrapper />
        </section>
        <VendorWrapper />
      </div>
    </ScrollArea>
  );
}
