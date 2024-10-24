"use client";

import { ISlider } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CustomImage } from "@/app/utils/image";

export default function CarouselComp(props: { sliderArr: ISlider[] }) {
  return (
    <div className="relative max-w-[calc(100vw-16px)]">
      <Carousel className="w-full">
        <CarouselContent>
          {(props.sliderArr || []).map((sliderNode) => (
            <CarouselItem key={sliderNode.id}>
              <section className={cn("relative flex h-[400px] items-center justify-center bg-primary-foreground")}>
                <CustomImage
                  width={400}
                  height={400}
                  alt={sliderNode.title}
                  src={sliderNode.image || ""}
                  fallbackImage="/slider-hero-2.jpg"
                  className="absolute inset-auto h-full w-full object-cover"
                  fallbackStyle="height: 400px; width: 400px; margin: 20px auto 0px auto;"
                  placeholder="data:image/base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />

                <section className="z-10 text-center">
                  <h1 className="text-5xl font-extrabold tracking-tight text-gray-50 shadow-white drop-shadow-lg md:text-6xl lg:text-7xl">
                    {sliderNode.title}
                  </h1>
                  <p className="mt-2 text-2xl font-bold text-gray-50 shadow-white drop-shadow-md">
                    {sliderNode.description}
                  </p>

                  <Button size="lg" className="mx-auto mt-12 w-fit font-semibold shadow-xl">
                    <Link href={`${sliderNode.link}`} target="_blank">
                      Book Now
                    </Link>
                  </Button>
                </section>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
      </Carousel>
    </div>
  );
}
