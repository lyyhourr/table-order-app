import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export function successToast(message?: string, title?: string) {
  return toast.success(title || "Success", {
    description: message ?? undefined,
    icon: <CheckCircle2 className="h-5 w-5" />,
    classNames: {
      toast: "border border-border bg-popover shadow-lg",
      title: "text-foreground font-semibold",
      description: "text-muted-foreground",
      icon: "text-emerald-600 dark:text-emerald-400",
      closeButton: "bg-popover hover:bg-accent border-border",
    },
  });
}

export function errorToast(message?: string, title?: string) {
  return toast.error(title || "Error", {
    description: message ?? undefined,
    icon: <XCircle className="h-5 w-5" />,
    classNames: {
      toast: "border border-destructive/30 bg-popover shadow-lg",
      title: "text-foreground font-semibold",
      description: "text-muted-foreground",
      icon: "text-destructive",
      closeButton: "bg-popover hover:bg-accent border-border",
    },
  });
}
