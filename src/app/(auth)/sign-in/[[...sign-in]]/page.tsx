import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[calc(100%-60px)] w-full items-center justify-center">
      <SignIn />
    </div>
  );
}
