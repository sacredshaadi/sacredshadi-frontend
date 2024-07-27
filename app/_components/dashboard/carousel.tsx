"use client";

import Image from "next/image";
import { ISlider } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function CarouselComp(props: { sliderArr: ISlider[] }) {
  return (
    <div className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {(props.sliderArr || []).map((sliderNode) => (
            <CarouselItem key={sliderNode.id}>
              <section className="flex h-[400px] w-full items-center justify-center bg-primary-foreground">
                {sliderNode.description}
              </section>
            </CarouselItem>
          ))}

          <CarouselItem>
            <Image
              src="/placeholder.svg"
              width={400}
              height={400}
              alt="Carousel Image 1"
              className="h-[400px] w-full object-cover"
            />
          </CarouselItem>

          <CarouselItem>
            <div className="flex h-[400px] w-full items-center justify-center bg-secondary">
              <h2 className="text-4xl font-bold text-secondary-foreground">Slide 2</h2>
            </div>
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/placeholder.svg"
              width={400}
              height={400}
              alt="Carousel Image 3"
              className="h-[400px] w-full object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
      </Carousel>
    </div>
  );
}
