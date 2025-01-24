"use client";

import { appList } from "@/lib/const";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AppList() {
  const router = useRouter();

  return (
    <div className="grid w-full gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
      {appList.map((app) => (
        <div
          className="flex w-full cursor-pointer gap-4 rounded-lg border bg-card p-3 text-card-foreground shadow-sm"
          key={app.key}
          onClick={() => router.push(app.pathname)}
        >
          <Button variant="secondary" size="icon" className="h-12 w-12">
            {app.icon}
          </Button>
          <div className="flex flex-col gap-1">
            <span className="font-bold">{app.name}</span>
            <span className="text-xs text-muted-foreground">{app.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
