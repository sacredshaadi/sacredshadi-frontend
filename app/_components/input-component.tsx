"use client";

import * as React from "react";

import { VendorEnum } from "@/types/user-facing";
import { fillerCities } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VendorType } from "@/types/auth.types";
import { ICity } from "@/types";
import { useVendorContext } from "../context/vendor-context";
import Link from "next/link";

type Props = {
  list: { value: string; label: string }[];
  placeholder?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

function DropDownInput({ list, placeholder, setState }: Props) {
  return (
    <Select onValueChange={(value) => setState(() => value)}>
      <SelectTrigger className="">
        <SelectValue placeholder={placeholder || "Enter value"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const VendorSelectWrapper = (props: { vendors: VendorType[]; cities: ICity[] }) => {
  const { setCities, setVendorTypes } = useVendorContext();
  const [vendor, setVendor] = React.useState("");
  const [city, setCity] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    setVendorTypes(props.vendors || []);
    setCities(props.cities || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.vendors]);

  return (
    <>
      <DropDownInput
        setState={setVendor}
        placeholder="Select Vendor Types"
        list={props.vendors.map((vendor) => ({ value: vendor.id as any, label: vendor.type }))}
      />

      <DropDownInput
        setState={setCity}
        placeholder="Select Cities"
        list={props.cities.map((city) => ({ value: city.id as any, label: city.name }))}
      />

      <Button
        className="lg:absolute lg:right-[-10rem] lg:my-auto"
        size={"lg"}
        onClick={() => {
          if (!vendor || !city) {
            toast({ title: "Please select both vendor and city", description: "", variant: "destructive" });
            return;
          }
          router.push(`/${vendor}?city=${city}`);
        }}
      >
        Get started
      </Button>
    </>
  );
};
