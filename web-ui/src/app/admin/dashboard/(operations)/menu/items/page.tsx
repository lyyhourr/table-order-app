import ContentWrapper from "@/components/custom-ui/content-wrapper";
import api from "@/lib/api-client";
import { Metadata } from "next";
import MenuItemTable from "./_components/menu-item-table";
import { TMenuItemList } from "./_utils/menu-item-schema";

export const metadata: Metadata = {
  title: "Menu Items",
};

export default async function Page() {
  const { data } = await api.get<TMenuItemList[]>("/menu-items");

  return (
    <ContentWrapper title="Menu Items">
      <MenuItemTable data={data ?? []} />
    </ContentWrapper>
  );
}
