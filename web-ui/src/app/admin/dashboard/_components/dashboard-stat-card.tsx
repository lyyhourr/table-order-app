import StatCard from "@/components/custom-ui/stat-card";
import api from "@/lib/api-client";
import { ShoppingBag, DollarSign, Table, UtensilsCrossed } from "lucide-react";

type TStatResponse = {
  totalMenuItems: number;
  totalIncome: number;
  totalTables: number;
  totalOrders: number;
};

export default async function DashboardStatCard() {
  const { data } = await api.get<TStatResponse>("/orders/stats");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Orders"
        value={data?.totalOrders.toLocaleString() ?? ""}
        description="All customer orders placed"
        Icon={ShoppingBag}
        color="text-blue-500"
      />

      <StatCard
        title="Total Income"
        value={`$${data?.totalIncome.toLocaleString()}`}
        description="Revenue from completed orders"
        Icon={DollarSign}
        color="text-green-500"
      />

      <StatCard
        title="Menu Items"
        value={data?.totalMenuItems.toLocaleString() ?? ""}
        description="Total items on the menu"
        Icon={UtensilsCrossed}
        color="text-orange-500"
      />

      <StatCard
        title="Tables"
        value={data?.totalTables.toLocaleString() ?? ""}
        description="Total tables in the system"
        Icon={Table}
        color="text-purple-500"
      />
    </div>
  );
}
