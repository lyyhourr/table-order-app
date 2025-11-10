"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type * as React from "react";

type TProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  previewClassName?: string;
  children?: React.ReactNode;
};

export default function PreviewImage({
  src,
  alt,
  width = 50,
  height = 50,
  className,
  previewClassName,
  children,
}: TProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Image
            src={src || "/placeholder.svg"}
            width={width}
            height={height}
            alt={alt}
            className={cn(className)}
          />
        )}
      </DialogTrigger>
      <DialogContent
        className={cn("max-w-4xl w-full p-0 overflow-hidden", previewClassName)}
        showCloseButton
      >
        <DialogTitle></DialogTitle>
        <div className="relative w-full h-[80vh] bg-muted/20">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            className="object-contain p-5"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
