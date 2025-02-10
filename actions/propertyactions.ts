"use server";

import { Category, Property } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_URL;

const propertyApi = `${baseUrl}/api/properties`;

export async function getProperties() {
  try {
    const res = await fetch(propertyApi, { cache: "no-store" });
    const fetchedProducts = await res.json();
    return fetchedProducts.data as Property[] & {
      Category: Category;
    };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSingleProperty(slug: string) {
  const singlePropertyApi = `${propertyApi}/${slug}`;
  try {
    const res = await fetch(singlePropertyApi, { cache: "no-store" });
    const singleCategory = await res.json();
    return singleCategory.data as Property & { category: Category };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteProperty(slug: string) {
  const singlePropertyApi = `${propertyApi}/${slug}`;
  try {
    const res = await fetch(singlePropertyApi, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
