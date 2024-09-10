import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PackageModalProps {
  packageName: string;
  description: string;
  price: string;
  vendorName: string;
  packageId: number;
}

const PackageModal = (props: PackageModalProps) => {
  return (
    <Card className="flex w-[400px] flex-col items-center justify-center overflow-hidden ring-2 ring-primary-foreground ring-offset-4">
      <CardTitle className=" w-full overflow-hidden">
        <Image width={400} height={250} layout="responsive" alt={"package_img"} className="object-contain" src={""} />
      </CardTitle>
      <CardHeader className="text-xl font-semibold">{props.packageName}</CardHeader>
      <CardDescription>{props.description}</CardDescription>
      <CardContent></CardContent>
      <CardFooter>
        <Button className="font-semibold shadow-lg" asChild>
          <Link href={`/package-details/${props.packageId}`}>Book now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageModal;
