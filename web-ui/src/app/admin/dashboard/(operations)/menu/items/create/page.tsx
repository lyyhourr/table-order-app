import ContentWrapper from "@/components/custom-ui/content-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import { Metadata } from "next";
import CreateMenuItemForm from "../_components/create-menu-item-form";

export const metadata: Metadata = {
  title: "Create Menu Item",
};
export default function Page() {
  return (
    <ContentWrapper title="Create Menu Item">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="size-5 text-primary" />
            Create Menu Item
          </CardTitle>
          <CardDescription>
            Fill in the details to create a new menu item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateMenuItemForm />
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
