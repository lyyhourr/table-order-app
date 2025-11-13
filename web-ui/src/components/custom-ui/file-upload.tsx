"use client";

import type React from "react";

import { MAX_FILE_SIZE } from "@/commons/constants/default-const";
import { generateUploadUrl } from "@/commons/helpers/bucket-helper";
import { getImagePath } from "@/commons/helpers/string-helper";
import { cn } from "@/lib/utils";
import { FileIcon as FileIconSolid, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface UploadedFileData {
  url: string;
  key: string;
  filename: string;
}

type TProps = {
  maxFileSize?: number;
  accept?: string;
  multiple?: boolean;
  onDelete?: (file: File, index: number) => void;
  onUploadComplete?: (uploadedFiles: UploadedFileData[]) => void;
  className?: string;
  disabled?: boolean;
  defaultImage?: string | string[];
};

export default function FileUpload({
  maxFileSize = MAX_FILE_SIZE,
  accept,
  multiple = false,
  onDelete,
  onUploadComplete,
  className,
  disabled = false,
  defaultImage,
}: TProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<number>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<Map<number, string>>(
    new Map()
  );

  function validateFile(file: File): string | null {
    if (maxFileSize && file.size > maxFileSize) {
      return `File ${file.name} exceeds maximum size of ${formatFileSize(
        maxFileSize
      )}`;
    }

    if (accept) {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileExtension = `.${file.name.split(".").pop()}`;
      const mimeType = file.type;

      const isValid = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension.toLowerCase() === type.toLowerCase();
        }
        if (type.endsWith("/*")) {
          return mimeType.startsWith(type.replace("/*", ""));
        }
        return mimeType === type;
      });

      if (!isValid) {
        return `File ${file.name} type not accepted. Accepted types: ${accept}`;
      }
    }

    return null;
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  async function handleFileChange(selectedFiles: FileList | null) {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const fileArray = Array.from(selectedFiles);
    const validFiles: File[] = [];
    let errorMessage = "";

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
        break;
      }
      validFiles.push(file);
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);
    const newFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(newFiles);

    const startIndex = newFiles.length - validFiles.length;
    validFiles.forEach((file, i) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrls((prev) => new Map(prev).set(startIndex + i, url));
      }
    });

    await uploadFiles(validFiles, startIndex);
  }

  function removeFile(index: number) {
    const fileToRemove = files[index];
    onDelete?.(fileToRemove, index);

    const previewUrl = previewUrls.get(index);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      const newPreviewUrls = new Map(previewUrls);
      newPreviewUrls.delete(index);
      setPreviewUrls(newPreviewUrls);
    }

    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    handleFileChange(droppedFiles);
  }

  async function uploadFiles(filesToUpload: File[], startIndex: number) {
    const uploadedFiles: UploadedFileData[] = [];
    const newUploadingFiles = new Set<number>();

    for (let i = 0; i < filesToUpload.length; i++) {
      newUploadingFiles.add(startIndex + i);
    }
    setUploadingFiles(newUploadingFiles);

    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];

        const { uploadUrl, publicUrl, key } = await generateUploadUrl(
          file.name,
          file.type
        );

        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload to R2");
        }

        uploadedFiles.push({
          url: publicUrl,
          key,
          filename: file.name,
        });

        setUploadingFiles((prev) => {
          const next = new Set(prev);
          next.delete(startIndex + i);
          return next;
        });
      }

      onUploadComplete?.(uploadedFiles);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
      setUploadingFiles(new Set());
    }
  }

  if (
    !multiple &&
    files.length === 0 &&
    defaultImage &&
    typeof defaultImage === "string"
  ) {
    return (
      <div
        className={cn("space-y-4 p-4 border rounded-lg max-w-md", className)}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFileChange(e.target.files)}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <div className="relative w-full h-64 bg-muted">
            <Image
              src={getImagePath(defaultImage)}
              alt="Default preview"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-background/60 hover:bg-background/40 transition-colors flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <Upload className="w-10 h-10 text-foreground" />
              <div className="text-sm">
                <span className="font-semibold text-foreground">
                  Click to upload
                </span>{" "}
                <span className="text-muted-foreground">or drag and drop</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}
      </div>
    );
  }

  if (!multiple && files.length > 0) {
    const file = files[0];
    const previewUrl = previewUrls.get(0);
    const isImage = file.type.startsWith("image/");
    const isUploading = uploadingFiles.has(0);

    return (
      <div
        className={cn("space-y-4 p-4 border rounded-lg max-w-md", className)}
      >
        <div className="relative border-2 border-dashed rounded-lg overflow-hidden">
          {isImage && previewUrl ? (
            <div className="relative w-full h-64 bg-muted">
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt={file.name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-muted flex items-center justify-center">
              <FileIconSolid className="w-16 h-16 text-muted-foreground" />
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-sm font-medium">Uploading...</p>
              </div>
            </div>
          )}

          {!isUploading && (
            <button
              onClick={() => removeFile(0)}
              className="absolute top-2 right-2 p-2 bg-background/90 hover:bg-background rounded-full transition-colors shadow-lg"
              type="button"
              aria-label="Remove file and upload new one"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}
      </div>
    );
  }

  const defaultImages = Array.isArray(defaultImage) ? defaultImage : [];
  const showDefaultImages =
    multiple && files.length === 0 && defaultImages.length > 0;

  return (
    <div className={cn("space-y-4 p-4 border rounded-lg max-w-md", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(e.target.files)}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-10 h-10 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Click to upload
            </span>{" "}
            or drag and drop
          </div>
          {accept && (
            <div className="text-xs text-muted-foreground">
              Accepted: {accept}
            </div>
          )}
          {maxFileSize && (
            <div className="text-xs text-muted-foreground">
              Max size: {formatFileSize(maxFileSize)}
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      {showDefaultImages && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Default images:
          </p>
          {defaultImages.map((imageUrl, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-muted rounded-md"
            >
              <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-background">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Default image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  Default image {index + 1}
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload files to replace
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {uploadingFiles.size > 0
              ? "Uploading files..."
              : `Selected ${files.length} file${files.length > 1 ? "s" : ""}:`}
          </p>
          {files.map((file, index) => {
            const previewUrl = previewUrls.get(index);
            const isImage = file.type.startsWith("image/");

            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-muted rounded-md"
              >
                {uploadingFiles.has(index) ? (
                  <Loader2 className="w-12 h-12 text-primary animate-spin shrink-0" />
                ) : isImage && previewUrl ? (
                  <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-background">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt={file.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 shrink-0 rounded bg-background flex items-center justify-center">
                    <FileIconSolid className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {uploadingFiles.has(index)
                      ? "Uploading..."
                      : formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={uploadingFiles.has(index)}
                  className="p-1 hover:bg-background rounded transition-colors disabled:opacity-50"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
