"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getRouteFromTitle } from "@/app/utils/functions";

interface VendorProps {
  title: string;
  description: string;
  route: string;
}

const VendorModal = ({ title, description }: VendorProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, translateY: "5rem" }}
      viewport={{
        once: true
      }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="flex w-[400px] flex-col items-center justify-center p-4">
        <CardContent>this is img</CardContent>
        <CardHeader>{title}</CardHeader>
        <CardDescription>WEDDING</CardDescription>
        <CardContent>{description}</CardContent>
        <CardFooter>
          <Link href={`/${getRouteFromTitle(title)}`}>
            <Button
              variant={"outline"}
              // onClick={() => onClick()}
            >
              View and Booking
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.section>
  );
};

export default VendorModal;
