import { deleteCookie } from "@/commons/helpers/cookie-helper";
import { ApiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export function useApiClient() {
  const router = useRouter();

  const onUnauthorized = async () => {
    await deleteCookie("token");
    router.push("/admin/unauthorized");
  };

  return new ApiClient(process.env.NEXT_PUBLIC_BASE_API_URL!, {
    onUnauthorized,
  });
}
