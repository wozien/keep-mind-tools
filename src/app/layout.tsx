import "@/styles/globals.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { zhCN } from "@clerk/localizations";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "待办清单",
  description: "My todo list",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="zh-CN" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
