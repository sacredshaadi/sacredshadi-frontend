import { CustomImage } from "@/app/utils/image";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        <CustomImage
          width={400}
          height={250}
          alt={"package_img"}
          className="h-[250px] object-cover"
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
