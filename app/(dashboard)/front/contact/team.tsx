import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { sacredShaadiTeam } from "@/constants/data";
import { PersonIcon } from "@radix-ui/react-icons";

const Team = () => {
  return (
    <section className="flex w-full flex-col items-center gap-4 p-4 lg:gap-8 lg:py-8 xl:gap-12 xl:py-12">
      <h1 className="text-center text-3xl font-bold lg:text-4xl xl:text-5xl">Our Team</h1>

      <Carousel
        opts={{
          align: "start"
        }}
        className="mx-auto w-full max-w-[80%] md:max-w-[90%]"
      >
        <CarouselContent className="py-2">
          {sacredShaadiTeam.map((itr, index) => (
            <CarouselItem key={index} className="basis-10/12 md:basis-1/2 lg:basis-1/4 ">
              <Card className="flex h-full flex-col items-center gap-2 p-12 shadow-md">
                <PersonIcon className="h-12 w-12 text-primary" />
                <CardContent className="!p-3 text-center text-xl font-semibold">
                  <span className="m-auto">{itr.name}</span>
                </CardContent>
                <CardDescription className="flex items-center justify-center p-6">
                  <span className="text-center text-lg font-semibold  ">{itr.role}</span>
                </CardDescription>
              </Card>
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
