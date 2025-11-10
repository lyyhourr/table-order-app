"use client";
import { getImagePath } from "@/commons/helpers/string-helper";
import { cn } from "@/lib/utils";
import PreviewImage from "./preview-image";

type TProps = {
  image?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function TableCellImage({
  image,
  width = 50,
  height = 50,
  className,
}: TProps) {
  const imagePath = getImagePath(image);

  return (
    <PreviewImage
      src={imagePath}
      alt={imagePath}
      width={width}
      height={height}
      className={cn("w-10 h-10 rounded-full object-fit", className)}
    />
  );
}
