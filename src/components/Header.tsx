import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <nav className="flex h-[60px] w-full items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" width={32} height={32} alt="" />
        <h1 className="text-xl font-bold">待办清单</h1>
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
        <ThemeToggle />
      </div>
    </nav>
  );
}
