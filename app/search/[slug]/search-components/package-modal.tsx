"use client";

import { CustomImage } from "@/app/utils/image";
import ServiceTypeRemoveModal from "@/app/vendor/services-offered/card-details/remove-modal";
import ServiceTypeUpdateModal from "@/app/vendor/services-offered/card-details/update-modal";
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
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [removeOpen, setRemoveOpen] = React.useState(false);

  return (
    <Card className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {!props.userFacing && (
        <section className="absolute right-4 top-4 z-50 grid grid-cols-1 items-center gap-1 bg-transparent sm:grid-cols-2 sm:gap-2">
          <ServiceTypeUpdateModal
            open={updateOpen}
            id={props.packageId}
            setOpen={setUpdateOpen}
            offerObj={{
              description: props.description,
              details: props.packageName,
              image: props.imageUrl,
              price: props.price
            }}
          />
          <ServiceTypeRemoveModal id={props.packageId} open={removeOpen} setOpen={setRemoveOpen} />
        </section>
      )}

      <CardTitle className=" w-full overflow-hidden">
        <CustomImage
          width={400}
          height={250}
          alt="package_img"
          src={props.imageUrl}
          className="h-[250px] object-cover"
          fallbackStyleObject={{ height: "250px", width: "400px" }}
        />
      </CardTitle>

      <CardHeader className="text-xl font-semibold">{props.packageName}</CardHeader>
      <CardDescription className="mb-4 p-2 sm:p-3">{props.description}</CardDescription>
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
