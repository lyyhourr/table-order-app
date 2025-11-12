"use client";

import { Badge } from "@/components/ui/badge";
import { TOrderStatus } from "../_utils/order-utils";

interface OrderStatusBadgeProps {
  status: TOrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getBadgeClasses = () => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  return <Badge className={getBadgeClasses()}>{status}</Badge>;
}
