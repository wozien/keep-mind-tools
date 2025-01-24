"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { LogoSvg } from "./LogoSvg";
import { usePathname } from "next/navigation";
import { getCurApp } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const curApp = getCurApp(pathname);

  return (
    <nav className="flex h-[60px] w-full items-center justify-between p-4">
      <Link className="flex items-center gap-2" href="/">
        <LogoSvg />
        <span className="font-bold">KMT</span>
      </Link>
      {curApp && (
        <h1 className="flex-auto text-center font-normal">{curApp.name}</h1>
      )}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
