"use client";

import { getImagePath } from "@/commons/helpers/string-helper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const totalItems = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const totalPrice = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const { tableId } = useParams<{ tableId?: string }>();

  if (!tableId) {
    return <p>Table not found</p>;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-md bg-white min-h-screen">
          <header className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Link href={`/${tableId}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
          </header>

          <div className="flex flex-col items-center justify-center px-4 py-20">
            <div className="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Looks like you haven&apos;t added any items to your cart yet
            </p>
            <Link href={`/${tableId}`}>
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md bg-white min-h-screen relative pb-32">
        <header className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/${tableId}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </div>
        </header>

        <main className="px-4 py-4">
          <div className="space-y-3">
            {items.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden border border-gray-200 bg-white rounded-2xl"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={getImagePath(item.image)}
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-7 w-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="text-sm font-semibold text-gray-900 min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
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
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="mx-auto max-w-md px-4 py-4">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-red-500">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-base font-semibold rounded-xl">
              Order Now - ${totalPrice.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
