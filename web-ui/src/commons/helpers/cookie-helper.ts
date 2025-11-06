"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string) {
  const store = await cookies();
  return store.get(name)?.value ?? null;
}

export async function setCookie(
  name: string,
  value: string,
  options?: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "lax" | "strict" | "none";
  }
) {
  const store = await cookies();
  store.set({
    name,
    value,
    ...options,
  });
}

export async function deleteCookie(name: string) {
  const store = await cookies();
  store.delete(name);
}

export async function setAuthCookie(token: string) {
  await setCookie("token", token, {
    maxAge: 60 * 60 * 24, // 1 days
  });
}
