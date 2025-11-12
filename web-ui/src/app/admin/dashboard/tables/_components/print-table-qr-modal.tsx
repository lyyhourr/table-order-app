"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { TTable } from "../_utils/table-schema";

export default function PrintTableQrModal({ data }: { data: TTable }) {
  const qrRef = useRef<HTMLDivElement>(null);

  const tableLink =
    typeof window !== "undefined" ? `${window.location.origin}/${data.id}` : "";

  if (!tableLink) return null;

  function handlePrint() {
    if (!qrRef.current) return;

    const printContent = qrRef.current.outerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=800");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                padding: 20px;
                background: white;
              }
              div {
                background: white;
              }
              svg {
                width: 400px !important;
                height: 400px !important;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start gap-2">
          <QrCode />
          Print QR
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-4">
        <DialogTitle>QR code for table {data.name}</DialogTitle>

        <div
          ref={qrRef}
          className="p-4 bg-white rounded-md flex flex-col items-center"
        >
          <QRCodeSVG
            value={tableLink}
            size={400}
            fgColor="#000000"
            bgColor="#ffffff"
          />
        </div>

        <div className="flex items-center justify-end gap-2 mt-2 w-full">
          <Link
            href={tableLink as Route}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Visit Qr Link</Button>
          </Link>
          <Button onClick={handlePrint}>Print</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
