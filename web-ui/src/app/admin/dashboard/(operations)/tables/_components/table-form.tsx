"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TBaseFormProps } from "@/commons/types/base-type";
import { Textarea } from "@/components/ui/textarea";
import { tableSchema, TTable, TTableSchema } from "../_utils/table-schema";

export default function TableForm({
  data,
  handleSubmit,
  onClose,
}: TBaseFormProps<TTableSchema, TTable>) {
  const form = useForm<TTableSchema>({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
    },
    resolver: zodResolver(tableSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium">
                  Description
                </FormLabel>
              </div>
              <FormControl>
                <Textarea placeholder="Enter table description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Close
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
