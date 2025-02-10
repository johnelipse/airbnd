"use client";

import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Category } from "@prisma/client";

const trimTitle = (title: string, maxLength: number = 45) => {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength) + "...";
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Category Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="image" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span title={title}>{trimTitle(title)}</span>;
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date published",
  //   cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <ActionColumn
          row={row}
          model="category"
          editEndpoint={`/dashboard/category/update/${data.slug}`}
          slug={data.slug}
        />
      );
    },
  },
];
