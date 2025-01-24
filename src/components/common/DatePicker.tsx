"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

export function DatePicker(props: CalendarProps) {
  return (
    <Popover>
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
            dayjs(props.selected as Date).format("YYYY/MM/DD")
          ) : (
            <span>选择日期筛选</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-[280px] p-0">
        <Calendar initialFocus {...props} />
      </PopoverContent>
    </Popover>
  );
}
