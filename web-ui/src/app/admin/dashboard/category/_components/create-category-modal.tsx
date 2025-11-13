"use client";
import CreateButton from "@/components/custom-ui/buttons/create-button";
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
import { TCategorySchema } from "../_utils/category-schema";
import CategoryForm from "./category-form";

export default function CreateCategoryModal() {
  const api = useApiClient();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function createCategory(payload: TCategorySchema) {
    const res = await api.post("/categories", payload);

    if (!res.success) {
      errorToast(res.message);
      return;
    }
    successToast("Category created successfully");
    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Category</DialogTitle>
        <CategoryForm
          data={null}
          handleSubmit={createCategory}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
