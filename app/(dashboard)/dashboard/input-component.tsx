'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type Props = {
  list: { value: string; label: string }[];
  placeholder?: string;
};

export function DropDownInput({ list, placeholder }: Props) {
  // React.useEffect(() => {
  //   console.log('list', list);
  // }, [list]);

  return (
    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder={placeholder || 'Enter value'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
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
