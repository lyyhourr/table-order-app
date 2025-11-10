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
import { TTableSchema } from "../_utils/table-schema";
import TableForm from "./table-form";

export default function CreateTableModal() {
  const api = useApiClient();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function createCategory(payload: TTableSchema) {
    const res = await api.post("/order-tables", payload);

    if (!res.success) {
      errorToast(res.message);
      return;
    }
    successToast("Tables created successfully");
    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Table</DialogTitle>
        <TableForm
          data={null}
          handleSubmit={createCategory}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
