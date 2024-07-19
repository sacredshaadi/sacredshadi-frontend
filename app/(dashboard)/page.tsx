import { ScrollArea } from '@/components/ui/scroll-area';
import VendorWrapper from '../_components/vendor-wrapper';
import { VendorSelectWrapper } from './input-component';

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-1 flex-col items-center space-y-4 p-4 md:p-8">
        <section className="relative flex w-full flex-col items-center justify-center gap-8 overflow-visible p-4 sm:w-4/5 lg:w-3/5 lg:flex-row">
          <VendorSelectWrapper />
        </section>
        <VendorWrapper />
      </div>
    </ScrollArea>
  );
}
