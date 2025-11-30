"use client";

import { AuthProvider as BetterAuthProvider } from "@better-auth/next/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <BetterAuthProvider>{children}</BetterAuthProvider>;
}
