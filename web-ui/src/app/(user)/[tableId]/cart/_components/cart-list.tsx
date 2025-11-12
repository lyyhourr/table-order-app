"use client";

import { getImagePath } from "@/commons/helpers/string-helper";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartList() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) return null;

  return (
    <div className="space-y-3 px-4 py-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden border border-gray-200 bg-white rounded-2xl"
        >
          <div className="flex gap-4 p-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={getImagePath(item.image) || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {item.name}
                </h3>
                <p className="text-base font-bold text-red-500">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-7 w-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3 text-gray-600" />
                  </button>
                  <span className="text-sm font-semibold text-gray-900 min-w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-7 w-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-3 w-3 text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
