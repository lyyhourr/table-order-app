"use client";

import { TAuthUser } from "@/commons/types/auth-type";
import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  user: TAuthUser | null;
  setUser: (user: TAuthUser | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
  user: initialUser,
}: {
  children: ReactNode;
  user: TAuthUser | null;
}) {
  const [user, setUser] = useState(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
