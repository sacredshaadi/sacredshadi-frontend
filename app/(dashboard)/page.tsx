import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sliderEndpoints } from "@/lib/apiConfig/endpoints";
import VendorWrapper from "@/app/_components/vendor-wrapper";
import CarouselComp from "@/app/_components/dashboard/carousel";
import { getAllVendorTypes, getAllCities } from "@/app/utils/functions";
import { VendorSelectWrapper } from "@/app/_components/input-component";

async function getSliderNodes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${sliderEndpoints.getAllCarousels}`, { method: "GET" });
    const data = await res.json();
    return data.data;
  } catch (err) {
    toast({ variant: "destructive", description: "Failed to fetch slider images" });
  }
}

export default async function page() {
  const [cities, slider, vendorTypes] = await Promise.all([getAllCities(), getSliderNodes(), getAllVendorTypes()]);

  return (
    <ScrollArea className="h-full ">
      <div className="flex flex-1 flex-col items-center space-y-4 py-4 md:py-8">
        <CarouselComp sliderArr={slider || []} />
        <section className=" relative flex w-full flex-col items-center justify-center gap-8 overflow-visible p-4 sm:w-4/5 lg:w-3/5 lg:flex-row">
          <VendorSelectWrapper vendors={vendorTypes} cities={cities} />
        </section>
        <VendorWrapper vendorTypes={vendorTypes || []} />
      </div>
    </ScrollArea>
  );
}
