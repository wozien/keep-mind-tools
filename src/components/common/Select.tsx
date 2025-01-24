"use client";

import * as React from "react";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectProps } from "@radix-ui/react-select";

export type ComposeSelectProps = SelectProps & {
  placeholder?: string;
  options: {
    value: string;
    label: string | React.ReactNode;
  }[];
};

export const Select: React.FC<ComposeSelectProps> = ({
  placeholder,
  options,
  ...props
}) => {
  return (
    <SelectRoot {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
