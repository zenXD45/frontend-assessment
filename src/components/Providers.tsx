'use client';

import { SessionProvider } from "next-auth/react";
import ThemeRegistry from "./ThemeRegistry/ThemeRegistry";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useSession } from "next-auth/react";

// Component to sync NextAuth session token to Zustand
function SessionSync() {
  const { data: session } = useSession();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (session && (session as any).accessToken) {
      setToken((session as any).accessToken);
    } else {
      setToken(null);
    }
  }, [session, setToken]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeRegistry>
        <SessionSync />
        {children}
      </ThemeRegistry>
    </SessionProvider>
  );
}
