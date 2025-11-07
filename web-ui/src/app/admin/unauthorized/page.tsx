"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    async function clearAuth() {
      await logout();

      router.replace("/admin/login");
    }
    clearAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader className="w-5 h-5 animate-spin" />
    </div>
  );
}
