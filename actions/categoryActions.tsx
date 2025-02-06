"use server";

import { Category } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_URL;

const categoryApi = `${baseUrl}/api/categories`;

export async function getCategories() {
  try {
    const res = await fetch(categoryApi);
    const fetchedProducts = await res.json();
    return fetchedProducts.data as Category[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
