"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

interface CreateButtonProps extends ButtonProps {
  label?: boolean;
}

export default function ViewButton({ label, ...props }: CreateButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full flex justify-start", props.className)}
      {...props}
    >
      <Eye />
      {label || "View"}
    </Button>
  );
}
