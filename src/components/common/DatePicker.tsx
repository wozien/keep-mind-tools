"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import type { DayPickerSingleProps } from "react-day-picker";

export function DatePicker(props: DayPickerSingleProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !props.selected && "text-muted-foreground",
            props.className,
          )}
        >
          <CalendarIcon />
          {props.selected ? (
            dayjs(props.selected).format("YYYY/MM/DD")
          ) : (
            <span>选择日期筛选</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-[280px] p-0">
        <Calendar
          {...props}
          initialFocus
          mode="single"
          onSelect={(...args: any) => {
            setOpen(false);
            if (props.onSelect) {
              props.onSelect.apply(null, args);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
