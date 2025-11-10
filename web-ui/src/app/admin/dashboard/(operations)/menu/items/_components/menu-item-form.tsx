"use client";

import type { TBaseFormProps } from "@/commons/types/base-type";
import FileUpload from "@/components/custom-ui/file-upload";
import SelectQuery from "@/components/custom-ui/select-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, FileText, FolderTree, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  menuItemSchema,
  type TMenuItemList,
  type TMenuItemSchema,
} from "../_utils/menu-item-schema";

export default function MenuItemForm({
  data,
  handleSubmit,
  onClose,
}: TBaseFormProps<TMenuItemSchema, TMenuItemList>) {
  const form = useForm<TMenuItemSchema>({
    defaultValues: {
      categoryId: data?.category.id || 0,
      name: data?.name || "",
      description: data?.description || "",
      image: data?.image || "",
      price: data?.price || 0,
      isAvailable: data?.available ?? true,
    },
    resolver: zodResolver(menuItemSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="w-full mx-auto">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <ImageIcon className="size-4 text-muted-foreground" />
                  Men Item Image
                </FormLabel>
                <FormControl>
                  <FileUpload
                    defaultImage={field.value}
                    accept="image/*"
                    multiple={false}
                    onUploadComplete={(files) => {
                      if (files.length > 0) {
                        field.onChange(files[0].key);
                      }
                    }}
                    className="p-0 border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="size-4 text-muted-foreground" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter menu item name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <FolderTree className="size-4 text-muted-foreground" />
                  Category
                </FormLabel>
                <FormControl>
                  <SelectQuery
                    endpoint="/categories/select"
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select a category..."
                    renderKey="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="size-4 text-muted-foreground" />
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="size-4 text-muted-foreground" />
                  Price
                </FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-medium">
                <FileText className="size-4 text-muted-foreground" />
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter menu item description..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
