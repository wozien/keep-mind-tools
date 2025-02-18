import { ListTodo, NotebookPen, Bookmark } from "lucide-react";
import { TodoDifficulty } from "@prisma/client";

export const enum AppNameEnum {
  TODOLIST = "todolist",
  NOTE = "note",
  BOOKMARKS = "bookmarks",
}

export const appList = [
  {
    key: AppNameEnum.TODOLIST,
    name: "待办清单",
    desc: "记录待办可以让你工作有条不紊",
    icon: <ListTodo />,
    pathname: "/todolist",
  },
  {
    key: AppNameEnum.NOTE,
    name: "随心笔记",
    desc: "记你所想，随你所记",
    icon: <NotebookPen />,
    pathname: "/note",
  },
  {
    key: AppNameEnum.BOOKMARKS,
    name: "书签馆",
    desc: "快速导入和预览你的书签",
    icon: <Bookmark />,
    pathname: "/bookmark",
  },
];

export const TodoDifficultyMap = new Map([
  [TodoDifficulty["EASY"], ["轻松", "bg-green-100 text-green-500"]],
  [TodoDifficulty["NORMAL"], ["正常", "bg-orange-100 text-orange-500"]],
  [TodoDifficulty["HARD"], ["困难", "bg-red-100 text-red-500"]],
]);

export type TodoListStatus = "doing" | "done" | "all";
