import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import React from "react";
import { columns } from "./columns";
import { getProperties } from "@/actions/propertyactions";

export default async function page() {
  const properties = (await getProperties()) || [];
  return (
    <div className="lg:p-8 md:p-8 ">
      <TableHeader
        title="Properties"
        linkTitle="Create Property"
        href="/dashboard/product/new"
        data={properties}
        model="property"
      />
      <div className="py-8">
        <DataTable data={properties} columns={columns} />
      </div>
    </div>
  );
}
