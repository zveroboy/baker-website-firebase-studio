"use client";

import { AuthProvider as BetterAuthProvider } from "better-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <BetterAuthProvider>{children}</BetterAuthProvider>;
}
