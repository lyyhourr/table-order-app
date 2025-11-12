"use client";

import { errorToast, successToast } from "@/components/ui/toast";
import { useApiClient } from "@/hooks/use-api";
import { useRouter } from "next/navigation";
import { TMenuItemList, TMenuItemSchema } from "../_utils/menu-item-schema";
import MenuItemForm from "./menu-item-form";

export default function EditMenuItemForm({ data }: { data: TMenuItemList }) {
  const api = useApiClient();

  const router = useRouter();

  async function editMenuItem(values: TMenuItemSchema) {
    const res = await api.put(`/menu-items/${data.id}`, values);

    if (!res.success) {
      return errorToast(res.message);
    }

    successToast("Menu item updated");
    router.push("/admin/dashboard/menu/items");
  }
  return <MenuItemForm data={data} handleSubmit={editMenuItem} />;
}
