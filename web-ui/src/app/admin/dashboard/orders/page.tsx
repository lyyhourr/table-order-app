import ContentWrapper from "@/components/custom-ui/content-wrapper";
import api from "@/lib/api-client";
import { Metadata } from "next";
import OrderTable from "./_components/order-table";
import { TOrders } from "./_utils/order-utils";

export const metadata: Metadata = {
  title: "Order",
};

export default async function Page() {
  const { data } = await api.get<TOrders[]>("/orders");

  return (
    <ContentWrapper title="Orders">
      <OrderTable data={data ?? []} />
    </ContentWrapper>
  );
}
