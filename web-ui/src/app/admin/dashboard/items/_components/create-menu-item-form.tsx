"use client";

import { errorToast, successToast } from "@/components/ui/toast";
import { useApiClient } from "@/hooks/use-api";
import { useRouter } from "next/navigation";
import { TMenuItemSchema } from "../_utils/menu-item-schema";
import MenuItemForm from "./menu-item-form";

export default function CreateMenuItemForm() {
  const api = useApiClient();

  const router = useRouter();

  async function createMenuItemForm(values: TMenuItemSchema) {
    const res = await api.post("/menu-items", values);
    console.log("run");
    if (!res.success) {
      return errorToast(res.message);
    }

    successToast("Menu item created");
    router.push("/admin/dashboard/menu/items");
  }
  return <MenuItemForm data={null} handleSubmit={createMenuItemForm} />;
}
