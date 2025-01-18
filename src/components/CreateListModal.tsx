"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createListZodSchema,
  type CreateListZodSchemaType,
} from "@/schema/createList";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ListMap } from "@/lib/const";
import { createListAction } from "@/actions/list";
import { useToast } from "@/hooks/use-toast";

export const CreateListModal = () => {
  const form = useForm({
    // 前端zod校验
    resolver: zodResolver(createListZodSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: CreateListZodSchemaType) => {
    try {
      await createListAction(data);
      onOpenChange(false);
      toast({
        title: "恭喜您",
        description: "清单创建成功！",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "哎呦",
        description: "清单创建失败",
        variant: "destructive",
      });
    }
  };

  const onOpenChange = (open: boolean) => {
    form.reset();
    setOpen(open);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>添加清单</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>添加清单</SheetTitle>
          <SheetDescription>
            清单是任务的集合，比如“工作”、“生活”、“副业”
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>设置清单的名称：</FormLabel>
                  <FormControl>
                    <Input placeholder="例如：工作" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>选择清单的背景色：</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn("w-[180px]", ListMap.get(field.value), {
                          "text-white": !!field.value,
                        })}
                      >
                        <SelectValue placeholder="颜色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[...ListMap.entries()].map(
                            ([color, [className, name]]) => {
                              return (
                                <SelectItem
                                  key={color}
                                  value={color}
                                  className={cn(
                                    "my-1 w-full rounded-md text-white focus:font-bold focus:text-white focus:ring-white",
                                    className,
                                    `focus:${className}`,
                                  )}
                                >
                                  {name}
                                </SelectItem>
                              );
                            },
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            创建
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
