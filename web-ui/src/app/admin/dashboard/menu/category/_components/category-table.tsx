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
import { TCategories } from "../_utils/category-schema";
import CreateCategoryModal from "./create-category-modal";
import UpdateCategoryModal from "./update-category-modal";

export default function CategoriesTable({ data }: { data: TCategories[] }) {
  const router = useRouter();

  async function onConfirmDelete(id: number) {
    const { success, message } = await api.delete(`/categories/${id}`);
    if (!success) {
      errorToast(message);
      return;
    }
    successToast("Category deleted successfully");
    router.refresh();
  }

  const columns: ColumnDef<TCategories>[] = [
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
            <UpdateCategoryModal data={row.original} />
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
    <DataTable<TCategories>
      columns={columns}
      data={data}
      topToolBar={{
        rightSection: <CreateCategoryModal />,
      }}
    />
  );
}
