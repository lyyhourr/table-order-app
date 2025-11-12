"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

type TProps = {
  open: boolean;
  onClose: () => void;
  message: string | null;
};

export default function ErrorModal({ open, onClose, message }: TProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
            Order Failed
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
