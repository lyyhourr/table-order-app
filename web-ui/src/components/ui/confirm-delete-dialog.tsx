"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./button";

export type ConfirmDeleteDialogProps = {
  title?: string;
  description?: string;
  triggerBtn?: ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
  confirmBtnClassName?: string;
};

export default function ConfirmDeleteDialog({
  onConfirm,
  description,
  title,
  triggerBtn,
  confirmLabel,
  confirmBtnClassName,
}: ConfirmDeleteDialogProps) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {triggerBtn || (
            <Button variant="ghost" className="w-full flex justify-start">
              <Trash2Icon className="text-destructive size-4" />
              <span className="text-destructive">Delete</span>
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title || "Are you sure you want to delete?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description || "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className={cn("bg-destructive", confirmBtnClassName)}
            >
              {confirmLabel || "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
