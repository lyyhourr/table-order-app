import { CartItem } from "@/hooks/use-cart";

export function downloadOrderImage(
  items: CartItem[],
  orderId: string | null,
  totalItems: number,
  totalPrice: number
) {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600 + items.length * 60;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ef4444";
  ctx.fillRect(0, 0, canvas.width, 120);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Order Placed Successfully!", canvas.width / 2, 70);

  ctx.font = "18px sans-serif";
  ctx.fillText("Thank you for your order!", canvas.width / 2, 100);

  ctx.fillStyle = "#1f2937";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Order ID:", 50, 160);
  ctx.font = "bold 22px monospace";
  ctx.fillText(orderId || "N/A", 160, 160);

  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText(new Date().toLocaleString(), 50, 190);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 220);
  ctx.lineTo(canvas.width - 50, 220);
  ctx.stroke();

  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("Item", 50, 260);
  ctx.fillText("Qty", canvas.width - 300, 260);
  ctx.fillText("Price", canvas.width - 200, 260);
  ctx.fillText("Total", canvas.width - 100, 260);

  let yPosition = 300;
  ctx.font = "14px sans-serif";
  items.forEach((item, index) => {
    ctx.fillStyle = index % 2 === 0 ? "#f9fafb" : "#ffffff";
    ctx.fillRect(40, yPosition - 25, canvas.width - 80, 50);

    ctx.fillStyle = "#1f2937";
    ctx.fillText(
      item.name.length > 30 ? item.name.substring(0, 30) + "..." : item.name,
      50,
      yPosition
    );
    ctx.fillText(item.quantity.toString(), canvas.width - 280, yPosition);
    ctx.fillText(`$${item.price.toFixed(2)}`, canvas.width - 200, yPosition);

    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(
      `$${(item.price * item.quantity).toFixed(2)}`,
      canvas.width - 100,
      yPosition
    );
    ctx.font = "14px sans-serif";

    yPosition += 60;
  });

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, yPosition);
  ctx.lineTo(canvas.width - 50, yPosition);
  ctx.stroke();

  yPosition += 40;
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`Total Items: ${totalItems}`, canvas.width - 50, yPosition);

  yPosition += 40;
  ctx.fillStyle = "#ef4444";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText(
    `Total: $${totalPrice.toFixed(2)}`,
    canvas.width - 50,
    yPosition
  );

  yPosition += 60;
  ctx.fillStyle = "#6b7280";
  ctx.font = "16px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    "Thanks for supporting our business!",
    canvas.width / 2,
    yPosition
  );

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `order-${orderId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });
}
