"use client";
import React, { useRef } from "react";
import "./timeline.css";
import "react-step-progress-bar/styles.css";
// @ts-expect-error
import { ProgressBar, Step } from "react-step-progress-bar";

interface MultiStepProgressBarProps {
  currentStep: number;
}

const Timeline = (props: MultiStepProgressBarProps) => {
  const stepPercentage = useRef(0);

  if (props.currentStep === 1) {
    stepPercentage.current = 0;
  } else if (props.currentStep === 2) {
    stepPercentage.current = 20;
  } else if (props.currentStep === 3) {
    stepPercentage.current = 40;
  } else if (props.currentStep === 4) {
    stepPercentage.current = 60;
  } else if (props.currentStep === 5) {
    stepPercentage.current = 80;
  } else if (props.currentStep === 6) {
    stepPercentage.current = 100;
  }

  return (
    <section className="mx-auto w-4/5">
      <ProgressBar percent={stepPercentage.current}>
        <Step>
          {({ accomplished, index }: any) => (
            <section className="relative">
              <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                {index + 1}
                <span className="absolute left-auto right-auto top-5 text-center text-sm font-semibold text-black">
                  Portfolio
                </span>
              </div>
            </section>
          )}
        </Step>
        <Step>
          {({ accomplished, index }: any) => (
            <section className="relative">
              <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                {index + 1}
                <span className="absolute left-auto right-auto top-5 text-center text-sm font-semibold text-black">
                  Service Type
                </span>
              </div>
            </section>
          )}
        </Step>
        <Step>
          {({ accomplished, index }: any) => (
            <section className="relative">
              <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                {index + 1}
                <span className="absolute left-auto right-auto top-5 text-center text-sm font-semibold text-black">
                  Function Type
                </span>
              </div>
            </section>
          )}
        </Step>
        <Step>
          {({ accomplished, index }: any) => (
            <section className="relative">
              <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                {index + 1}
                <span className="absolute left-auto right-auto top-5 text-center text-sm font-semibold text-black">
                  Packages
                </span>
              </div>
            </section>
          )}
        </Step>
        <Step>
          {({ accomplished, index }: any) => (
            <section className="relative">
              <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                {index + 1}
                <span className="absolute left-auto right-auto top-5 text-center text-sm font-semibold text-black">
                  Additional Details
                </span>
              </div>
            </section>
          )}
        </Step>
        <Step>
          {({ accomplished, index }: any) => (
            <section className="relative">
              <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                {index + 1}
                <span className="absolute left-auto right-auto top-5 text-center text-sm font-semibold text-black">
                  Portfolio List
                </span>
              </div>
            </section>
          )}
        </Step>
      </ProgressBar>
    </section>
  );
};

export default Timeline;
