"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/common/DatePicker";
// import { Input } from "@/components/ui/input";
import { CreateListModal } from "./CreateListModal";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function CheckListHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "doing";
  const expireTime = searchParams.get("expireTime");

  const onValueChange = (status: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("status", status);
    router.push(`${pathname}?${current.toString()}`);
  };

  const onSelectExpireAt = (...events: any[]) => {
    const expireTime = (events[0] as Date).getTime();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("expireTime", String(expireTime));
    router.push(`${pathname}?${current.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <Tabs defaultValue={status} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="doing">正在进行</TabsTrigger>
          <TabsTrigger value="done">已完成</TabsTrigger>
          <TabsTrigger value="all">全部清单</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="hidden flex-auto justify-end gap-2 md:flex">
        {/* <Input placeholder="搜索清单名称" className="w-[200px]" /> */}
        <DatePicker
          className="w-[180px]"
          initialFocus
          mode="single"
          selected={expireTime ? new Date(+expireTime) : undefined}
          onSelect={onSelectExpireAt}
        />
      </div>

      <div>
        <CreateListModal />
      </div>
    </div>
  );
}
