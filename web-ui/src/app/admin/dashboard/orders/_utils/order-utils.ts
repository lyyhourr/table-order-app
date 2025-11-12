export type TOrders = {
  id: number;
  tableName: string;
  status: TOrderStatus;
  totalPrice: number;
  createdAt: string;
  orderItems: {
    menuItemName: string;
    quantity: number;
    subTotal: number;
  }[];
};

export type TOrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";
