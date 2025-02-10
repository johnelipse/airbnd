"use server";

import { Category, Property } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_URL;

const categoryApi = `${baseUrl}/api/categories`;

export async function getCategories() {
  try {
    const res = await fetch(categoryApi, { cache: "no-store" });
    const fetchedProducts = await res.json();
    return fetchedProducts.data as Category[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSingleCat(slug: string) {
  const singleCatApi = `${categoryApi}/${slug}`;
  try {
    const res = await fetch(singleCatApi, { cache: "no-store" });
    const singleCategory = await res.json();
    return singleCategory.data as Category & { properties: Property[] };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteCat(slug: string) {
  const singleCatApi = `${categoryApi}/${slug}`;
  try {
    const res = await fetch(singleCatApi, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}
