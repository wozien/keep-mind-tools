"use server";

import {
  createListZodSchema,
  type CreateListZodSchemaType,
} from "@/schema/createList";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createListAction(data: CreateListZodSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  const result = createListZodSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    };
  }

  // 数据库处理
  await db.list.create({
    data: {
      userId: user.id,
      name: data.name,
      color: data.color,
    },
  });

  revalidatePath("/");

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

  await db.list.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/");
}
