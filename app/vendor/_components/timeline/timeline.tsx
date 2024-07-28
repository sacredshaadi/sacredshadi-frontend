"use client";
import "./timeline.css";
import React from "react";
import "react-step-progress-bar/styles.css";
// @ts-expect-error
import { ProgressBar, Step } from "react-step-progress-bar";

const percentages = [0, 20, 40, 60, 80, 100];

const Timeline = (props: { currentStep: number }) => {
  const stepPercentage = percentages[props.currentStep - 1];

  return (
    <section className="mx-auto w-4/5 pb-14">
      <ProgressBar percent={stepPercentage}>
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
