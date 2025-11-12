import ContentWrapper from "@/components/custom-ui/content-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api-client";
import { Package } from "lucide-react";
import EditMenuItemForm from "../../_components/edit-menu-item-form";
import { TMenuItemList } from "../../_utils/menu-item-schema";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const menu = await api.get<TMenuItemList>(`/menu-items/${id}`);

  if (!menu.success || !menu.data) {
    return (
      <p className="text-destructive text-lg font-semibold">
        Error loading menu item
      </p>
    );
  }

  return (
    <ContentWrapper title="Update Menu Item">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="size-5 text-primary" />
            Update Menu Item
          </CardTitle>
          <CardDescription>
            Fill in the details to update the menu item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditMenuItemForm data={menu.data} />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
