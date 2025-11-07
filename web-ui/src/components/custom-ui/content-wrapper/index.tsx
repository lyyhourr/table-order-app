import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import GoBackButton from "./go-back-btn";

type TContentWrapperProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  showBackButton?: boolean;
};
export default function ContentWrapper({
  children,
  className,
  title,
  showBackButton = true,
}: TContentWrapperProps) {
  return (
    <div className={cn("flex flex-col  gap-3", className)}>
      {title && (
        <div className="flex items-center gap-3">
          {showBackButton && <GoBackButton />}
          <p className="text-2xl font-semibold">{title}</p>
        </div>
      )}
      {children}
    </div>
  );
}
