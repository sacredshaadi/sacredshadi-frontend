"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceOffered } from "@/types/auth.types";
import React from "react";
import ServiceTypeUpdateModal from "./update-modal";
import ServiceTypeRemoveModal from "./remove-modal";

interface ServiceCardProps {
  offerObj: ServiceOffered;
  vendorSubType: string;
}

const ServiceCard = (props: ServiceCardProps) => {
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [removeOpen, setRemoveOpen] = React.useState(false);

  return (
    <Card className="relative">
      <section className="absolute right-4 top-4 grid grid-cols-1 items-center gap-1 bg-transparent sm:grid-cols-2 sm:gap-2">
        <ServiceTypeUpdateModal id={props.offerObj.id} open={updateOpen} setOpen={setUpdateOpen} />
        <ServiceTypeRemoveModal id={props.offerObj.id} open={removeOpen} setOpen={setRemoveOpen} />
      </section>
      <CardHeader>
        <CardTitle>{props.vendorSubType}</CardTitle>
        <CardDescription>{props.offerObj.description}</CardDescription>
      </CardHeader>
      <CardContent>{props.offerObj.details}</CardContent>
      <CardFooter>
        <span className="text-sm font-bold">Price: {props.offerObj.price}</span>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
