export function MoreText({ text }: { text?: string }) {
  return (
    <p className="w-full py-4 text-center text-xs text-muted-foreground">
      {text || "更多应用正在开发中哦~~"}
    </p>
  );
}
