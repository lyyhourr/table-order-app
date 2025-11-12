"use client";

import UpdateButton from "@/components/custom-ui/buttons/update-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { errorToast, successToast } from "@/components/ui/toast";
import api from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TOrders, TOrderStatus } from "../_utils/order-utils";
import OrderStatusBadge from "./order-status-badge";

interface UpdateOrderStatusDialogProps {
  data: TOrders;
}

export default function UpdateOrderStatusDialog({
  data,
}: UpdateOrderStatusDialogProps) {
  const [status, setStatus] = useState<TOrderStatus>(data.status);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleUpdate() {
    if (loading) return;
    setLoading(true);

    const { success, message } = await api.put(
      `/orders/${data.id}/status?status=${status}`
    );

    if (!success) {
      errorToast(message || "Failed to update order status");
      setLoading(false);
      return;
    }

    successToast("Order status updated successfully");
    router.refresh();
    setOpen(false);
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateButton label="Status" disabled={loading} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle>Update Order Status</DialogTitle>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Current Status:
            </span>
            <OrderStatusBadge status={data.status} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              Change Status To:
            </span>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TOrderStatus)}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem
                  value="PENDING"
                  className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100 border-l-4 border-amber-500 dark:border-amber-600 focus:bg-amber-200 dark:focus:bg-amber-900"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value="COMPLETED"
                  className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100 border-l-4 border-emerald-500 dark:border-emerald-600 focus:bg-emerald-200 dark:focus:bg-emerald-900"
                >
                  Completed
                </SelectItem>
                <SelectItem
                  value="CANCELLED"
                  className="bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-100 border-l-4 border-rose-500 dark:border-rose-600 focus:bg-rose-200 dark:focus:bg-rose-900"
                >
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
