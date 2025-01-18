import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ListMap } from "@/lib/const";
import { CheckListFooter } from "./CheckListFooter";
import { TaskItem } from "./TaskItem";
import type { List, Task } from "@prisma/client";

type CheckListProps = {
  checkList: List & {
    tasks: Task[];
  };
};

function CheckList({ checkList }: CheckListProps) {
  const { name, color, tasks } = checkList;

  return (
    <Card
      className={cn("w-full text-white sm:col-span-2", ListMap.get(color)?.[0])}
      x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? <p>目前没有任务</p> : <></>}
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </CardContent>
      <CardFooter className="flex-col pb-2">
        <CheckListFooter checkList={checkList} />
      </CardFooter>
    </Card>
  );
}

export async function CheckLists() {
  const user = await currentUser();
  const checkLists = await db.list.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (!checkLists.length) {
    return <div className="mt-4">尚未创建清单，赶紧创建一个吧!</div>;
  }

  return (
    <div className="mt-6 flex w-full flex-col gap-4">
      {checkLists.map((checkList) => (
        <CheckList key={checkList.id} checkList={checkList} />
      ))}
    </div>
  );
}
