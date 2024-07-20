import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function CarouselComp() {
  return (
    <div className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <img src="/placeholder.svg" alt="Carousel Image 1" className="h-[400px] w-full object-cover" />
          </CarouselItem>
          <CarouselItem>
            <div className="flex h-[400px] w-full items-center justify-center bg-secondary">
              <h2 className="text-4xl font-bold text-secondary-foreground">Slide 2</h2>
            </div>
          </CarouselItem>
          <CarouselItem>
            <img src="/placeholder.svg" alt="Carousel Image 3" className="h-[400px] w-full object-cover" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
      </Carousel>
    </div>
  );
}
