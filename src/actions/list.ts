"use server";

import {
  todoListZodSchema,
  type TodoListZodSchemaType,
} from "@/schema/todolist";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createListAction(data: TodoListZodSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  const result = todoListZodSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    };
  }

  // 数据库处理
  await db.todoList.create({
    data: {
      userId: user.id,
      content: data.content,
      difficulty: data.difficulty,
      expireAt: data.expireAt,
    },
  });

  revalidatePath("/todolist");

  return {
    success: true,
    message: "清单创建成功",
  };
}

export async function deleteListAction(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  await db.todoList.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/todolist");
}

/**
 * 设置待办事项的完成状态
 * @param id 待办事项ID
 * @param done 完成状态
 */
export async function setListDoneAction(id: number, done: boolean) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  await db.todoList.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      done,
    },
  });

  revalidatePath("/todolist");
}
