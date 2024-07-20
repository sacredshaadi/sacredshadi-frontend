import { ScrollArea } from "@/components/ui/scroll-area";
import VendorWrapper from "../_components/vendor-wrapper";
import { VendorSelectWrapper } from "./input-component";
import CarouselComp from "../_components/dashboard/carousel";
import { toast } from "@/components/ui/use-toast";
import { sliderUrls } from "@/lib/apiConfig/urls";
import { getAllVendorTypes } from "../utils/functions";

async function getSliderNodes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${sliderUrls.getAllCarousels}`, {
      method: "GET"
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    toast({
      variant: "destructive",
      description: "Failed to fetch slider images"
    });
  }
}

export default async function page() {
  const slider = await getSliderNodes();
  const vendorTypes = await getAllVendorTypes();

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-1 flex-col items-center space-y-4 py-4 md:py-8">
        <CarouselComp sliderArr={slider || []} />
        <section className=" relative flex w-full flex-col items-center justify-center gap-8 overflow-visible p-4 sm:w-4/5 lg:w-3/5 lg:flex-row">
          <VendorSelectWrapper />
        </section>
        <VendorWrapper vendorTypes={vendorTypes || []} />
      </div>
    </ScrollArea>
  );
}
