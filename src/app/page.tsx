import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AppList } from "@/components/AppList";
import { MoreText } from "@/components/MoreText";

async function Welcome() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <Card className="w-full sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          欢迎 {user.firstName} {user.lastName}!
        </CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          开始使用KMT，✨🤔✨定格你的灵感瞬间.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>开始使用</Button>
      </CardFooter>
    </Card>
  );
}

function WelcomeFallback() {
  return <Skeleton className="h-[180px] w-full" />;
}

export default function Page() {
  return (
    <main className="flex w-full flex-col items-center px-4">
      <Suspense fallback={<WelcomeFallback />}>
        <Welcome />
      </Suspense>

      <AppList />
      <MoreText />
    </main>
  );
}
