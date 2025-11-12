import api from "@/lib/api-client";
import { Metadata } from "next";
import CategoriesTable from "./_components/category-table";
import { TCategories } from "./_utils/category-schema";
import ContentWrapper from "@/components/custom-ui/content-wrapper";

export const metadata: Metadata = {
  title: "Category",
};

export default async function Category() {
  const { data } = await api.get<TCategories[]>("/categories");

  return (
    <ContentWrapper title="Categories">
      <CategoriesTable data={data ?? []} />
    </ContentWrapper>
  );
}
