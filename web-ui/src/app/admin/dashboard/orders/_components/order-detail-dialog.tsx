import ViewButton from "@/components/custom-ui/buttons/view-button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, Hash, Table2 } from "lucide-react";
import { TOrders } from "../_utils/order-utils";

export default function OrderDetailDialog({ data }: { data: TOrders }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20";
      case "COMPLETED":
        return "bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20";
      case "CANCELLED":
        return "bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ViewButton />
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-semibold">
          Order Details
        </DialogTitle>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium">#{data.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Table2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Table</p>
                <p className="font-medium">{data.tableName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium text-sm">
                  {formatDate(data.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(data.status)}>
                  {data.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Order Items</h3>
            <div className="space-y-3">
              {data.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.menuItemName}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">${item.subTotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-lg font-semibold">Total Price</p>
            <p className="text-2xl font-bold">${data.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
