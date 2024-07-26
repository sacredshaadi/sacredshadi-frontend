import React from "react";
import SubServiceCard from "../../service-type/sub-service-card";

interface CardWrapperProps {
  type: string;
}

const CardWrapper = (props: CardWrapperProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-lg font-bold sm:text-xl lg:text-3xl">Type(s) of {props.type}</h1>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 3xl:grid-cols-6">
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
        <SubServiceCard />
      </section>
    </section>
  );
};

export default CardWrapper;
