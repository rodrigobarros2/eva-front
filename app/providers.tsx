"use client";

import { ThemeProvider } from "@/components/theme-provider";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
