import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceOffered } from "@/types/auth.types";
import React from "react";

interface ServiceCardProps {
  offerObj: ServiceOffered;
  vendorSubType: string;
}

const ServiceCard = (props: ServiceCardProps) => {
  return (
    <Card>
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
