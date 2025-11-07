"use client";

import { deleteCookie } from "@/commons/helpers/cookie-helper";
import { TAuthUser } from "@/commons/types/auth-type";
import api from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  user: TAuthUser | null;
  setUser: (user: TAuthUser | null) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
  token,
}: {
  children: ReactNode;
  token: string | null;
}) {
  const [user, setUser] = useState<TAuthUser | null>(null);

  const router = useRouter();

  async function logout() {
    await deleteCookie("token");
    setUser(null);
    router.replace("/admin/login");
  }

  useEffect(() => {
    async function getUser() {
      if (!token) {
        await logout();
        return;
      }

      const { data, success } = await api.get<TAuthUser>("/auth/profile");

      if (success) {
        setUser(data ?? null);
      } else {
        setUser(null);
      }
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
