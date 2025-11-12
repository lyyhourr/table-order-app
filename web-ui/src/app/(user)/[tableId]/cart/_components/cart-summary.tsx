import { Button } from "@/components/ui/button";

type TProps = {
  totalPrice: number;
  onOrderClick: () => void;
  onClearCart: () => void;
};

export default function CartSummary({
  totalPrice,
  onOrderClick,
  onClearCart,
}: TProps) {
  return (
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

        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-base font-semibold rounded-xl"
          onClick={onOrderClick}
        >
          Order Now - ${totalPrice.toFixed(2)}
        </Button>
        <Button variant="outline" className="w-full mt-2" onClick={onClearCart}>
          Clear All
        </Button>
      </div>
    </div>
  );
}
