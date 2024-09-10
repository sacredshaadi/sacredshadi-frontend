import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PackageModalProps {
  packageName: string;
  description: string;
  price: string;
}

const PackageModal = (props: PackageModalProps) => {
  return (
    <Card className="flex w-[400px] flex-col items-center justify-center overflow-hidden ring-2 ring-primary-foreground ring-offset-4">
      <CardTitle className=" w-full overflow-hidden">
        <Image width={400} height={250} layout="responsive" alt={""} className="object-contain" src={""} />
      </CardTitle>
      <CardHeader className="text-xl font-semibold">{props.packageName}</CardHeader>
      <CardDescription>WEDDING</CardDescription>
      <CardContent>{props.description}</CardContent>
      <CardFooter>
        <Link href={``}>
          <Button variant={"outline"}>Book now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PackageModal;
