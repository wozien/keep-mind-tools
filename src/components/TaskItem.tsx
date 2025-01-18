"use client";

import type { Task } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { setTaskDoneAction } from "@/actions/task";
import { useEffect, useState } from "react";

export function TaskItem({ task }: { task: Task }) {
  const [done, setDone] = useState(task.done);

  useEffect(() => {
    setDone(task.done);
  }, [task.done]);

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={task.id.toString()}
        className="h-5 w-5 bg-white"
        checked={done}
        onCheckedChange={async (val) => {
          setDone(val as boolean);
          await setTaskDoneAction(task.id, val as boolean);
        }}
      />
      <Label
        htmlFor={task.id.toString()}
        className={cn("flex items-center gap-2", done && "line-through")}
      >
        {task.content}
        {task.expiresAt && (
          <p
            className={cn("text-xs text-white", {
              "text-red-800": Date.now() - task.expiresAt.getTime() > 0,
            })}
          >
            {dayjs(task.expiresAt).format("YYYY/MM/DD")}
          </p>
        )}
      </Label>
    </div>
  );
}
