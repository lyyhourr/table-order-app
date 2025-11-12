"use client";

import { removeImageFromBucket } from "@/commons/helpers/bucket-helper";
import CreateButton from "@/components/custom-ui/buttons/create-button";
import UpdateButton from "@/components/custom-ui/buttons/update-button";
import DataTable from "@/components/custom-ui/data-table";
import TableCellImage from "@/components/custom-ui/table-cell-image";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TMenuItemList } from "../_utils/menu-item-schema";

export default function MenuItemTable({ data }: { data: TMenuItemList[] }) {
  const router = useRouter();

  async function onConfirmDelete(id: number) {
    const { success, message } = await api.delete(`/menu-items/${id}`);
    if (!success) {
      errorToast(message);
      return;
    }
    successToast("Menu item deleted successfully");
    router.refresh();

    const imageKey = data.find((item) => item.id === id)?.image || "";
    if (imageKey) {
      await removeImageFromBucket(imageKey);
    }
  }

  const columns: ColumnDef<TMenuItemList>[] = [
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
            <Link href={`/admin/dashboard/menu/items/edit/${row.original.id}`}>
              <UpdateButton />
            </Link>

            <ConfirmDeleteDialog
              onConfirm={() => onConfirmDelete(row.original.id)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return <TableCellImage image={row.original.image} />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "category",
      header: "Category",
      accessorFn: (row) => row.category.name,
    },
    {
      accessorKey: "price",
      header: "Price",
      accessorFn: (row) => row.price.toFixed(2) + " $",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ];

  return (
    <DataTable<TMenuItemList>
      columns={columns}
      data={data}
      topToolBar={{
        rightSection: (
          <Link href="/admin/dashboard/menu/items/create">
            <CreateButton />
          </Link>
        ),
      }}
    />
  );
}
