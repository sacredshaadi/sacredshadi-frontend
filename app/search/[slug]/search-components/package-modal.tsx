import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PackageModalProps {
  packageName: string;
  description: string;
  price: string;
  vendorName: string;
  packageId: number;
  userFacing: boolean;
  imageUrl: string;
}

const PackageModal = (props: PackageModalProps) => {
  return (
    <Card className="flex w-full flex-col items-center justify-center overflow-hidden">
      <CardTitle className=" w-full overflow-hidden">
        <Image
          width={400}
          height={250}
          layout="responsive"
          alt={"package_img"}
          className="object-contain"
          src={props.imageUrl}
        />
      </CardTitle>

      <CardHeader className="text-xl font-semibold">{props.packageName}</CardHeader>
      <CardDescription className="mb-4">{props.description}</CardDescription>
      {props.userFacing && (
        <CardFooter>
          <Button className="font-semibold shadow-lg" asChild>
            <Link href={`/package-details/${props.packageId}`}>Book now</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PackageModal;
