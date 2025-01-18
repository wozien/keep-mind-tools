import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[calc(100%-60px)] w-full items-center justify-center">
      <SignUp />
    </div>
  );
}
