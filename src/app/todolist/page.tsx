import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckList } from "@/components/todolist/CheckList";
import { CheckListHeader } from "@/components/todolist/CheckListHeader";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import type { TodoListStatus } from "@/lib/const";

function SkeletonFallback() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[60px] w-full" />
      <Skeleton className="h-[60px] w-full" />
    </div>
  );
}

export default async function TodoLisPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: TodoListStatus;
    expireTime?: string;
  }>;
}) {
  const status = (await searchParams)?.status ?? "doing";
  const expireTime = (await searchParams)?.expireTime;
  const user = await currentUser();

  const list = await db.todoList.findMany({
    where: {
      userId: user?.id,
      done: status === "done" ? true : status === "doing" ? false : undefined,
      expireAt: expireTime ? new Date(+expireTime) : undefined,
    },
  });

  return (
    <main className="flex h-[calc(100%-60px)] flex-col gap-6 p-4">
      <CheckListHeader />
      <Suspense fallback={<SkeletonFallback />}>
        <CheckList list={list} />
      </Suspense>
    </main>
  );
}
