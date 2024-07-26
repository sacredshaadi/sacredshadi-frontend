import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import React from "react";

const SubServiceCard = () => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <CardHeader title="Service Type">Service</CardHeader>
      <CardDescription>this is card</CardDescription>
      <CardContent>card content</CardContent>
    </Card>
  );
};

export default SubServiceCard;
