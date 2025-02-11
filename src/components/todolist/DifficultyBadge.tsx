"use client";

import { Badge } from "@/components/ui/badge";
import { TodoDifficultyMap } from "@/lib/const";
import { cn } from "@/lib/utils";
import type { TodoDifficulty } from "@prisma/client";

type DifficultyBadgeProps = {
  diff: TodoDifficulty;
};

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ diff }) => {
  const diffCfg = TodoDifficultyMap.get(diff);
  const colorClass = diffCfg?.[1];

  return (
    <Badge
      variant="outline"
      className={cn("border-none px-4 py-1 text-xs", colorClass)}
    >
      {diffCfg?.[0]}
    </Badge>
  );
};
