import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PencilLineIcon } from "lucide-react";

interface CreateButtonProps extends ButtonProps {
  label?: string;
}

export default function UpdateButton({ label, ...props }: CreateButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full flex justify-start", props.className)}
      {...props}
    >
      <PencilLineIcon />
      {label || "Edit"}
    </Button>
  );
}
