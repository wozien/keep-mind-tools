"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  todoListZodSchema,
  type TodoListZodSchemaType,
} from "@/schema/todolist";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  DatePicker,
  Dialog,
  Select,
  Form,
  type ComposeFormProps,
} from "@/components/common";
import { createListAction } from "@/actions/list";
import { DifficultyBadge } from "./DifficultyBadge";

const fieldConfig: ComposeFormProps["fields"] = [
  {
    name: "content",
    label: "任务内容",
    render: (field) => <Input className="col-span-3" {...field} />,
  },
  {
    name: "difficulty",
    label: "任务难度",
    render: (field) => (
      <Select
        value={field.value}
        onValueChange={field.onChange}
        placeholder="选择任务难度"
        options={[
          { label: <DifficultyBadge diff="EASY" />, value: "EASY" },
          { label: <DifficultyBadge diff="NORMAL" />, value: "NORMAL" },
          { label: <DifficultyBadge diff="HARD" />, value: "HARD" },
        ]}
      />
    ),
  },
  {
    name: "expireAt",
    label: "截止日期",
    render: (field) => (
      <DatePicker
        mode="single"
        selected={field.value}
        onSelect={field.onChange}
        initialFocus
      />
    ),
  },
];

export function CreateListModal() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(todoListZodSchema),
    defaultValues: {
      content: "",
      difficulty: "EASY",
      expireAt: undefined,
    } as any,
  });

  const onOpenChange = (open: boolean) => {
    form.reset();
    setOpen(open);
  };

  const onSubmit = async (data: TodoListZodSchemaType) => {
    console.log(data);
    try {
      await createListAction(data);
      toast({
        title: "操作成功",
        description: "任务已经添加！",
      });
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "操作失败",
        description: "任务创建失败，请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="添加任务"
      description="任务是按照自身能力完成工作的最小单元"
      trigger={<Button>创建</Button>}
      footer={
        <Button
          className="w-full text-white"
          disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          确认
        </Button>
      }
    >
      <div className="grid gap-4 py-4">
        <Form {...form} fields={fieldConfig} onSubmit={onSubmit} />
      </div>
    </Dialog>
  );
}
