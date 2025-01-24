import { z } from "zod";
import { TodoDifficulty } from "@prisma/client";

const difficultyZodSchema = z.union([
  z.literal(TodoDifficulty["EASY"]),
  z.literal(TodoDifficulty["NORMAL"]),
  z.literal(TodoDifficulty["HARD"]),
]);

export const todoListZodSchema = z.object({
  content: z.string().min(1, {
    message: "内容不能为空",
  }),
  difficulty: difficultyZodSchema,
  expireAt: z.date().optional(),
});

export type TodoDifficultyZodType = z.infer<typeof difficultyZodSchema>;
export type TodoListZodSchemaType = z.infer<typeof todoListZodSchema>;
