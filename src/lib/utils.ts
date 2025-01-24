import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { appList } from "./const";

// 处理 tailwindcss 的优先级合并
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurApp(key: string) {
  return appList.find(
    (app) =>
      (app.key as string) === key ||
      (key.startsWith("/") && key === app.pathname),
  );
}
