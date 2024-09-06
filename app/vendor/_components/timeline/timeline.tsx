"use client";

import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const percentages = [0, 33, 67, 100];

const steps = ["profile", "service-type", "service-package", "portfolio-list"];
const stepRoutes = ["/vendor/profile", "/vendor/service-type", "/vendor/function-type", "/vendor/package"];

const Timeline = (props: { currentStep: number }) => {
  const router = useRouter();
  const stepPercentage = percentages[props.currentStep - 1];

  return (
    <section className="mx-auto w-4/5 pb-20">
      <ProgressBar percent={stepPercentage} filledBackground="rgb(244, 63, 94)">
        {steps.map((step, index) => (
          <Step key={index}>
            {({ accomplished, index }: any) => (
              <section className="relative ">
                <div
                  onClick={() => router.push(stepRoutes[index - 1])}
                  className={cn(
                    "text-white, flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs font-bold text-white",
                    accomplished ? "bg-rose-500" : "bg-gray-300"
                  )}
                >
                  {index + 1}
                  <span className="absolute left-auto right-auto top-12 text-center text-sm font-semibold text-black">
                    {step
                      .split("-")
                      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                      .join(" ")}
                  </span>
                </div>
              </section>
            )}
          </Step>
        ))}
      </ProgressBar>
    </section>
  );
};

export default Timeline;
