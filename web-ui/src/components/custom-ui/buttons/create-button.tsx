"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateButtonProps extends ButtonProps {
  label?: string;
}

export default function CreateButton({ label, ...props }: CreateButtonProps) {
  return (
    <Button variant="outline" {...props}>
      <Plus className="size-4" />
      Create
    </Button>
  );
}
