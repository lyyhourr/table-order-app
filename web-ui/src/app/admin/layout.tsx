import { getCookie } from "@/commons/helpers/cookie-helper";
import AuthProvider from "@/providers/auth-provider";
import ThemeProvider from "@/providers/next-theme-provider";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const token = await getCookie("token");

  return (
    <AuthProvider token={token}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
