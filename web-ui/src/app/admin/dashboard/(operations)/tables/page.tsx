import ContentWrapper from "@/components/custom-ui/content-wrapper";
import api from "@/lib/api-client";
import { Metadata } from "next";
import TablesTable from "./_components/tables-table";
import { TTable } from "./_utils/table-schema";

export const metadata: Metadata = {
  title: "Tables",
};

export default async function Page() {
  const { data } = await api.get<TTable[]>("/order-tables");

  return (
    <ContentWrapper title="Tables">
      <TablesTable data={data ?? []} />
    </ContentWrapper>
  );
}
