"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createTaskZodSchema,
  type CreateTaskZodSchemaType,
} from "@/schema/createTask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useToast } from "@/hooks/use-toast";
import { createTaskAction } from "@/actions/task";
import type { List } from "@prisma/client";

export function CreateTaskModal({ checkList }: { checkList: List }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { id, name } = checkList;

  const form = useForm({
    resolver: zodResolver(createTaskZodSchema),
    defaultValues: {
      todoId: id,
      content: "",
      expiresAt: undefined,
    },
  });

  const onOpenChange = (open: boolean) => {
    form.reset();
    setOpen(open);
  };

  const onSubmit = async (data: CreateTaskZodSchemaType) => {
    try {
      await createTaskAction(data);
      toast({
        title: "操作成功",
        description: "任务已经添加！",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "操作失败",
        description: "任务创建失败，请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>添加任务</DialogTitle>
          <DialogDescription>任务将添加到 「{name}」 清单</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              className="flex flex-col space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>任务内容：</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>截止日期：</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarDays className="mr-1 h-4 w-4" />
                            {field.value &&
                              dayjs(field.value).format("YYYY/MM/DD")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button
            className="w-full text-white"
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
