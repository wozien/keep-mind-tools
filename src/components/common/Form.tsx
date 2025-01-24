"use client";

import * as React from "react";
import {
  Form as FormRoot,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type {
  FormProviderProps,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

type FieldConfig = {
  name: string;
  label: string;
  render: (field: ControllerRenderProps) => React.ReactNode;
};

export type ComposeFormProps = Omit<FormProviderProps, "children"> & {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
};

export const Form: React.FC<ComposeFormProps> = ({
  fields,
  onSubmit,
  ...props
}) => {
  return (
    <FormRoot {...props}>
      <form
        className="flex flex-col space-y-4"
        onSubmit={props.handleSubmit(onSubmit)}
      >
        {fields.map(({ name, label, render }) => (
          <FormField
            key={name}
            control={props.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}: </FormLabel>
                <FormControl>{render(field)}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </FormRoot>
  );
};
