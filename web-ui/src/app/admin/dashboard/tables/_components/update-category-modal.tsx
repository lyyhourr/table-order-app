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
import { TTable, TTableSchema } from "../_utils/table-schema";
import TableForm from "./table-form";

export default function UpdateTableModal({ data }: { data: TTable }) {
  const api = useApiClient();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function updateTable(payload: TTableSchema) {
    const res = await api.put(`/order-tables/${data.id}`, payload);
    if (!res.success) {
      errorToast(res.message);
      return;
    }
    successToast("Table updated successfully");
    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateButton />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Table</DialogTitle>
        <TableForm
          data={data}
          handleSubmit={updateTable}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
