import React from "react";
import { VendorLayout } from "../vendor-layout";
import Timeline from "../timeline/timeline";
import { Separator } from "@/components/ui/separator";

interface VendorRouteWrapperProps {
  title: string;
  currentStep: number;
  serviceType?: string;
  guidelines?: string[];
  children?: React.ReactNode;
  headerNav?: React.ReactNode;
}

const VendorRouteWrapper = (props: VendorRouteWrapperProps) => {
  return (
    <VendorLayout title={props.title}>
      {props.headerNav}
      <Timeline currentStep={props.currentStep} />
      <section className="flex flex-col gap-4">
        {props.serviceType && (
          <section className="flex flex-col gap-4">
            <h1 className="text-lg font-bold sm:text-xl lg:text-3xl">Guidelines for {props.serviceType}</h1>
            {props.guidelines && (
              <ul className="list-inside list-disc pl-2">
                {props.guidelines.map((guideline, index) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        <Separator />
        {props.children}
      </section>
    </VendorLayout>
  );
};

export default VendorRouteWrapper;
