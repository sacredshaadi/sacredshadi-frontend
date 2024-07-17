import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { sacredShaadiTeam } from '@/constants/data';
import { PersonIcon } from '@radix-ui/react-icons';
import { PersonStandingIcon } from 'lucide-react';
import React from 'react';

const Team = () => {
  return (
    <section className="flex w-full flex-col items-center gap-4 p-4">
      <h1 className="text-center text-3xl font-bold">Our Team</h1>

      <Carousel
        opts={{
          align: 'start'
        }}
        className="mx-auto w-full max-w-[80%] md:max-w-[90%]"
      >
        <CarouselContent>
          {sacredShaadiTeam.map((itr, index) => (
            <CarouselItem
              key={index}
              className="basis-10/12 md:basis-1/2 lg:basis-1/4"
            >
              {/* <div className="p-1"> */}
              <Card className="flex h-full flex-col items-center gap-2 p-12">
                <PersonIcon className="h-12 w-12 text-primary" />
                <CardContent className="text-center">{itr.name}</CardContent>
                <CardDescription className="flex items-center justify-center p-6">
                  <span className="text-center font-semibold">{itr.role}</span>
                </CardDescription>
              </Card>
              {/* </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Team;
