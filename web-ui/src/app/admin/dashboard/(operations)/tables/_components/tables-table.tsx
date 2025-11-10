"use client";

import DataTable from "@/components/custom-ui/data-table";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "@/components/ui/confirm-delete-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { errorToast, successToast } from "@/components/ui/toast";
import api from "@/lib/api-client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { TTable } from "../_utils/table-schema";
import CreateTableModal from "./create-table-modal";
import UpdateTableModal from "./update-category-modal";

export default function TablesTable({ data }: { data: TTable[] }) {
  const router = useRouter();

  async function onConfirmDelete(id: number) {
    const { success, message } = await api.delete(`/order-tables/${id}`);
    if (!success) {
      errorToast(message);
      return;
    }
    successToast("Table deleted successfully");
    router.refresh();
  }

  const columns: ColumnDef<TTable>[] = [
    {
      header: "Action",
      id: "table-action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <UpdateTableModal data={row.original} />
            <ConfirmDeleteDialog
              onConfirm={() => onConfirmDelete(row.original.id)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },

    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "description",
      header: "Description",
    },
  ];

  return (
    <DataTable<TTable>
      columns={columns}
      data={data}
      topToolBar={{
        rightSection: <CreateTableModal />,
      }}
    />
  );
}
