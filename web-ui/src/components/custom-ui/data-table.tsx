"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState, type ReactNode } from "react";

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  searchPlaceholder?: string;
  showRowNumbers?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  topToolBar?: {
    leftSection?: ReactNode;
    rightSection?: ReactNode;
  };
  enableSearch?: boolean;
}

export default function DataTable<T>({
  columns,
  data,
  searchPlaceholder = "Search...",
  showRowNumbers = true,
  pageSize = 10,
  emptyMessage = "No results found.",
  topToolBar,
  enableSearch = true,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnsWithRowNumber: ColumnDef<T>[] = showRowNumbers
    ? [
        {
          id: "rowNumber",
          header: "No",
          cell: ({ row, table }) => {
            const pageIndex = table.getState().pagination.pageIndex;
            const pageSize = table.getState().pagination.pageSize;
            return (
              <div className="w-10 font-medium">
                {pageIndex * pageSize + row.index + 1}
              </div>
            );
          },
        } as ColumnDef<T>,
        ...columns,
      ]
    : columns;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: columnsWithRowNumber,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter: globalFilter.trim(),
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  function hasActionRow(rowId: string) {
    return rowId.includes("table-action");
  }
  return (
    <div className="w-full">
      <div className="flex items-center py-2 justify-between">
        <div className="flex items-center gap-2">
          {topToolBar?.leftSection && topToolBar.leftSection}
          {enableSearch && (
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {topToolBar?.rightSection && topToolBar.rightSection}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              const hasAction = headerGroup.headers.some((h) =>
                hasActionRow(h.id)
              );
              return (
                <TableRow key={headerGroup.id}>
                  {hasAction && <TableHead>Action</TableHead>}
                  {headerGroup.headers.map((header) => {
                    if (hasActionRow(header.id)) {
                      return null;
                    }
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const actionRow = row
                  .getVisibleCells()
                  .find((cell) => hasActionRow(cell.id));
                return (
                  <TableRow key={row.id}>
                    {actionRow && (
                      <TableCell>
                        {flexRender(
                          actionRow.column.columnDef.cell,
                          actionRow.getContext()
                        )}
                      </TableCell>
                    )}

                    {row.getVisibleCells().map((cell) => {
                      if (hasActionRow(cell.id)) {
                        return null;
                      }
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsWithRowNumber.length + 1}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getFilteredRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground font-bold">
            Total : {table.getFilteredRowModel().rows.length} records
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="icon"
              className="text-xs size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
              (pageIndex) => {
                const currentPage = table.getState().pagination.pageIndex;
                const totalPages = table.getPageCount();

                const showPage =
                  pageIndex === 0 ||
                  pageIndex === totalPages - 1 ||
                  (pageIndex >= currentPage - 1 &&
                    pageIndex <= currentPage + 1);

                const showEllipsisBefore =
                  pageIndex === currentPage - 2 && currentPage > 2;
                const showEllipsisAfter =
                  pageIndex === currentPage + 2 && currentPage < totalPages - 3;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <div
                      key={pageIndex}
                      className="flex h-9 w-9 items-center justify-center text-sm"
                    >
                      ...
                    </div>
                  );
                }

                if (!showPage) return null;

                return (
                  <Button
                    key={pageIndex}
                    variant={currentPage === pageIndex ? "default" : "outline"}
                    size="icon"
                    className="text-xs size-8"
                    onClick={() => table.setPageIndex(pageIndex)}
                  >
                    {pageIndex + 1}
                  </Button>
                );
              }
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              className="text-xs size-8"
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
