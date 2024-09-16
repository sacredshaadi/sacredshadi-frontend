"use client";

import Image from "next/image";
import { ISlider } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CarouselComp(props: { sliderArr: ISlider[] }) {
  return (
    <div className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {(props.sliderArr || []).map((sliderNode) => (
            <CarouselItem key={sliderNode.id}>
              <section
                className={cn("relative flex h-[400px] w-full items-center justify-center bg-primary-foreground")}
              >
                <Image
                  src={
                    sliderNode.image ||
                    "https://sacredshaadi.com/assets/slider/30-04-2023_10-31-00am_116455551_1774586579382216_3764911622315615791_n.jpg"
                  }
                  width={400}
                  height={400}
                  alt={sliderNode.title}
                  className="absolute inset-auto w-full object-cover"
                  placeholder="data:image/base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
                <section className="z-10 grid grid-cols-1 gap-4 text-center">
                  <h1 className="text-4xl font-bold ">{sliderNode.title} </h1>
                  <span className="text-2xl font-semibold ">{sliderNode.description}</span>
                  <Button asChild className="mx-auto w-fit font-semibold shadow-xl">
                    <Link href={`${sliderNode.link}`} target="_blank">
                      Book Now
                    </Link>
                  </Button>
                </section>
              </section>
            </CarouselItem>
          ))}{" "}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground transition-colors hover:bg-background/75" />
      </Carousel>
    </div>
  );
}
