"use client";

import DataTable from "@/components/custom-ui/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { TOrders } from "../_utils/order-utils";
import OrderDetailDialog from "./order-detail-dialog";
import OrderStatusBadge from "./order-status-badge";
import UpdateOrderStatusDialog from "./update-order-status-dialog";

export default function OrderTable({ data }: { data: TOrders[] }) {
  const columns: ColumnDef<TOrders>[] = [
    {
      header: "Action",
      id: "table-action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <OrderDetailDialog data={row.original} />
            <UpdateOrderStatusDialog data={row.original} />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "tableName",
      header: "Table",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <OrderStatusBadge status={row.original.status} />;
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      accessorFn: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      accessorKey: "orderItems",
      header: "Items",
      accessorFn: (row) => row.orderItems.length + " item(s) ",
    },
  ];

  return <DataTable<TOrders> columns={columns} data={data} />;
}
