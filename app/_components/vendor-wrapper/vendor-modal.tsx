"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { VendorType } from "@/types/auth.types";
import Image from "next/image";

type VendorProps = {
  vendorType: VendorType;
  description: string;
  route: string;
};

const VendorModal = ({ vendorType, description }: VendorProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, translateY: "5rem" }}
      viewport={{
        once: true
      }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="flex w-[400px] flex-col items-center justify-center overflow-hidden ring-2 ring-primary-foreground ring-offset-4">
        <CardTitle className=" w-full overflow-hidden">
          <Image
            src={vendorType.image || ""}
            alt={vendorType.type}
            width={400}
            height={250}
            layout="responsive"
            className="object-contain"
          />
        </CardTitle>
        <CardHeader className="text-xl font-semibold">{vendorType.type}</CardHeader>
        <CardDescription>WEDDING</CardDescription>
        <CardContent>{description}</CardContent>
        <CardFooter>
          <Link href={`/${vendorType.id}`}>
            <Button variant={"outline"}>View and Booking</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.section>
  );
};

export default VendorModal;
