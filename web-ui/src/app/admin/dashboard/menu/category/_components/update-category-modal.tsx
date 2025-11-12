"use client";
import UpdateButton from "@/components/custom-ui/buttons/update-button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { errorToast, successToast } from "@/components/ui/toast";
import { useApiClient } from "@/hooks/use-api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TCategories, TCategorySchema } from "../_utils/category-schema";
import CategoryForm from "./category-form";

export default function UpdateCategoryModal({ data }: { data: TCategories }) {
  const api = useApiClient();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function updateCategory(payload: TCategorySchema) {
    const res = await api.put(`/categories/${data.id}`, payload);

    if (!res.success) {
      errorToast(res.message);
      return;
    }
    successToast("Category updated successfully");
    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateButton />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Category</DialogTitle>
        <CategoryForm
          data={data}
          handleSubmit={updateCategory}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
