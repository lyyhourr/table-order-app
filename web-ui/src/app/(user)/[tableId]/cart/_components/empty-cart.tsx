import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function EmptyCart({ tableId }: { tableId: string }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md bg-white min-h-screen flex flex-col items-center justify-center px-4">
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
            Start Order
          </Button>
        </Link>
      </div>
    </div>
  );
}
