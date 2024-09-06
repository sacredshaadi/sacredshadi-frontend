"use client";

import React, { Dispatch, SetStateAction } from "react";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

interface MultipleSelectorCompProps {
  arr: Option[];
  setArr: Dispatch<SetStateAction<Option[]>>;
  defaultOptions: Option[];
}

const MultipleSelectorComp = ({ arr, setArr, defaultOptions }: MultipleSelectorCompProps) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <MultipleSelector
        value={arr}
        onChange={setArr}
        placeholder="Select\update your services"
        hidePlaceholderWhenSelected
        defaultOptions={defaultOptions}
        emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600">No results found.</p>}
      />
    </div>
  );
};

export default MultipleSelectorComp;
