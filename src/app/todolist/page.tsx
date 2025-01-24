import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckList } from "@/components/todolist/CheckList";
import { CheckListHeader } from "@/components/todolist/CheckListHeader";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

function SkeletonFallback() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[60px] w-full" />
      <Skeleton className="h-[60px] w-full" />
    </div>
  );
}

export default async function TodoLisPage() {
  const user = await currentUser();

  const list = await db.todoList.findMany({
    where: {
      userId: user?.id,
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
