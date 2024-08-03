import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { VendorSubType } from "@/types/auth.types";
import React from "react";

interface SubServiceCardProps {
  vendorSubtype: VendorSubType;
}

const SubServiceCard = ({ vendorSubtype }: SubServiceCardProps) => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <CardHeader title="Service Type">{vendorSubtype.subType}</CardHeader>
      <CardDescription>this is some stuff</CardDescription>
      <CardContent>card content</CardContent>
    </Card>
  );
};

export default SubServiceCard;
