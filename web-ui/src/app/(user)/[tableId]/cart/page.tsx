"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import api from "@/lib/api-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import CartList from "./_components/cart-list";
import CartSummary from "./_components/cart-summary";
import EmptyCart from "./_components/empty-cart";
import ErrorModal from "./_components/error-modal";
import OrderModal from "./_components/order-modal";

export default function CartPage() {
  const { tableId } = useParams<{ tableId?: string }>();
  const { items, clearCart } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  if (!tableId) return <p>Table not found</p>;

  if (items.length === 0) return <EmptyCart tableId={tableId} />;

  const handleOrderClick = () => {
    setIsModalOpen(true);
    setOrderSuccess(false);
    setOrderId(null);
  };

  const handleClearAndClose = () => {
    clearCart();
    setIsModalOpen(false);
    setOrderSuccess(false);
    setOrderId(null);
  };

  const confirmOrder = async () => {
    setIsLoading(true);

    const { success, message, data } = await api.post<{ id: number }>(
      `/user-orders/${tableId}`,
      {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }
    );

    setIsLoading(false);

    if (success) {
      setOrderSuccess(true);
      setOrderId(data?.id.toString() || null);
    } else {
      setErrorMessage(message || "Failed to place order. Please try again.");
      setShowErrorModal(true);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md bg-white min-h-screen relative pb-32">
        <header className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-200 flex items-center gap-3">
          <Link href={`/${tableId}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Order Items</h1>
        </header>

        <CartList />
        <CartSummary
          totalPrice={totalPrice}
          onOrderClick={handleOrderClick}
          onClearCart={clearCart}
        />

        <OrderModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          items={items}
          totalItems={totalItems}
          totalPrice={totalPrice}
          isLoading={isLoading}
          orderSuccess={orderSuccess}
          orderId={orderId}
          onConfirm={confirmOrder}
          onClear={handleClearAndClose}
        />

        <ErrorModal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          message={errorMessage}
        />
      </div>
    </div>
  );
}
