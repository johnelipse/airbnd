import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import React from "react";
import { columns } from "./columns";
import { getCategories } from "@/actions/categoryActions";

export default async function page() {
  const categories = (await getCategories()) || [];
  return (
    <div className="lg:p-8 md:p-8 ">
      <TableHeader
        title="Categories"
        linkTitle="Create Category"
        href="/dashboard/category/new"
        data={categories}
        model="property"
      />
      <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}
