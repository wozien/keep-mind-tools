"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DifficultyBadge } from "./DifficultyBadge";
import { MoreText } from "../MoreText";
import type { TodoList } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dayjs from "dayjs";
import { useToast } from "@/hooks/use-toast";
import { deleteListAction } from "@/actions/list";

function CheckListItem({ item }: { item: TodoList }) {
  const { toast } = useToast();

  const deleteCheckList = async () => {
    try {
      await deleteListAction(item.id);
      toast({
        title: "操作成功",
        description: "清单已经删除",
      });
    } catch (e) {
      toast({
        title: "操作失败",
        description: "清单删除失败，请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex flex-auto items-center gap-2">
        <Checkbox className="h-5 w-5 bg-white" />
        <span>{item.content}</span>
        <span className="text-xs text-muted-foreground">
          {item.expireAt && dayjs(item.expireAt).format("YYYY/MM/DD")}
        </span>
      </div>

      <DifficultyBadge diff={item.difficulty} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" size="icon">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
            <AlertDialogDescription>该操作无法撤回</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCheckList()}>
              确定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function CheckList({ list }: { list: TodoList[] }) {
  return (
    <div className="flex flex-col gap-4">
      {!list?.length && <MoreText text="空空如也，赶快一个吧~" />}
      {list.map((item) => (
        <CheckListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
