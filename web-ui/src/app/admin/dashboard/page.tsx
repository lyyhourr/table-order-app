import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api-client";
import DashboardStatCard from "./_components/dashboard-stat-card";
import OrderStatusChart from "./_components/order-status-chart";
import { TOrderStatus } from "./orders/_utils/order-utils";
import PopularItem from "./_components/popular-item";

export default async function Page() {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const { data } = await api.get<TStatusSummary>("/orders/status-summary");
  const { data: popular } = await api.get<TPopularItem>(
    "/orders/popular-items",
    {
      topN: 5,
    }
  );

  return (
    <div className="space-y-6 p-6">
      <div className="border-primary/20">
        <h1 className="text-3xl font-bold text-foreground">{greeting} ! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back to your dashboard. Here&apos;s what&apos;s happening with
          your restaurant today.
        </p>
      </div>

      <DashboardStatCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <OrderStatusChart data={data ?? []} />

        <PopularItem data={popular ?? []} />
      </div>
    </div>
  );
}

export type TStatusSummary = {
  status: TOrderStatus;
  value: number;
}[];

export type TPopularItem = {
  name: string;
  totalOrdered: number;
}[];
