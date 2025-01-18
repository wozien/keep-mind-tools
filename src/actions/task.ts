"use server";

import { currentUser } from "@clerk/nextjs/server";
import {
  createTaskZodSchema,
  type CreateTaskZodSchemaType,
} from "@/schema/createTask";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTaskAction(task: CreateTaskZodSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  const result = createTaskZodSchema.safeParse(task);

  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    };
  }

  const { content, todoId, expiresAt } = result.data;

  await db.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      list: {
        connect: {
          id: todoId,
        },
      },
    },
  });

  revalidatePath("/");
}

export async function setTaskDoneAction(id: number, done: boolean) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  await db.task.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      done,
    },
  });

  revalidatePath("/");
}
