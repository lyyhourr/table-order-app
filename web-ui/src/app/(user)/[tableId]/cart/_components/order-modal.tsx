"use client";

import { downloadOrderImage } from "@/commons/helpers/download-img-helper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartItem } from "@/hooks/use-cart";
import { Check, Download } from "lucide-react";

type TProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  orderSuccess: boolean;
  orderId: string | null;
  onConfirm: () => void;
  onClear: () => void;
};

export default function OrderModal({
  open,
  onClose,
  items,
  totalItems,
  totalPrice,
  isLoading,
  orderSuccess,
  orderId,
  onConfirm,
  onClear,
}: TProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {!orderSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Confirm Your Order
              </DialogTitle>
              <DialogDescription>
                Review your order details before confirming
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-red-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-red-500">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-xl font-bold text-center">
                Order Placed Successfully!
              </DialogTitle>
              <DialogDescription className="text-center">
                Your order has been confirmed
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Order ID
                </p>
                <p className="font-mono font-bold text-lg text-gray-900 dark:text-gray-100">
                  {orderId}
                </p>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-1 border-b border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-red-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Items
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {totalItems}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Amount
                  </span>
                  <span className="font-bold text-red-500 text-lg">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() =>
                  downloadOrderImage(items, orderId, totalItems, totalPrice)
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download Order Receipt
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={onClear}
              >
                Clear Cart & Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
