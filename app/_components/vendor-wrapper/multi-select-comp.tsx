"use client";
import React, { useEffect } from "react";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

// const OPTIONS: Option[] = [
//   { label: "nextjs", value: "Nextjs", disable: false },
//   { label: "React", value: "react" },
//   { label: "Remix", value: "remix" },
//   { label: "Vite", value: "vite" },
//   { label: "Nuxt", value: "nuxt" },
//   { label: "Vue", value: "vue" },
//   { label: "Svelte", value: "svelte" },
//   { label: "Angular", value: "angular" },
//   { label: "Ember", value: "ember" },
//   { label: "Gatsby", value: "gatsby" },
//   { label: "Astro", value: "astro" }
// ];

interface MultipleSelectorCompProps {
  arr: Option[];
  setArr: React.Dispatch<React.SetStateAction<Option[]>>;
  defaultOptions: Option[];
}

const MultipleSelectorComp = ({ arr, setArr, defaultOptions }: MultipleSelectorCompProps) => {
  // const [value, setValue] = React.useState<Option[]>([]);

  return (
    <div className="flex w-full flex-col gap-5">
      {/* <p className="text-primary">Your selection: {value.map((val) => val.label).join(", ")}</p> */}
      <MultipleSelector
        value={arr}
        onChange={setArr}
        placeholder="Select\update your services"
        defaultOptions={defaultOptions}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">No results found.</p>
        }
      />
    </div>
  );
};

export default MultipleSelectorComp;
