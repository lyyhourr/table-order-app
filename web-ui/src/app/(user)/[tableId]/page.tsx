import { TCategories } from "@/app/admin/dashboard/category/_utils/category-schema";
import { TUserMenu } from "@/commons/types/user-type";
import ErrorCard from "@/components/custom-ui/error-card";
import api from "@/lib/api-client";
import MainMenu from "./_components/main-menu";

export default async function Page({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  const { tableId } = await params;

  if (!tableId) {
    return <ErrorCard message="Error: Table ID is missing" />;
  }

  const { success: validTable } = await api.get(
    `/user-orders/tables/${tableId}`
  );

  if (!validTable) {
    return <ErrorCard message="Error: Invalid Table ID" />;
  }

  const [{ data: menu }, { data: categories }] = await Promise.all([
    api.get<TUserMenu[]>(`/user-menus`),
    api.get<TCategories[]>(`/user-menus/categories`),
  ]);

  return <MainMenu menuItems={menu ?? []} categoryList={categories ?? []} />;
}
