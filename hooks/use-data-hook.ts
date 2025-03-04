"use client";

import { getCategories, getSingleCat } from "@/actions/categoryActions";
import { getProperties, getSingleProperty } from "@/actions/propertyactions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useProperty() {
  const queryClient = useQueryClient();
  const propertyQuery = useQuery({
    queryKey: ["property"],
    queryFn: getProperties,
  });

  return {
    properties: propertyQuery.data ?? [],
    isLoading: propertyQuery.isLoading,
    error: propertyQuery.error || propertyQuery.error,
  };
}

export function useCategory() {
  const queryClient = useQueryClient();
  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return {
    allCategories: categoryQuery.data ?? [],
    isLoading: categoryQuery.isLoading,
    error: categoryQuery.error,
  };
}
export function useSingleProperty(slug: string) {
  const queryClient = useQueryClient();
  const PropertyQuery = useQuery({
    queryKey: ["property", slug],
    queryFn: () => getSingleProperty(slug),
  });

  return {
    property: PropertyQuery.data || null,
    isLoading: PropertyQuery.isLoading,
    error: PropertyQuery.error,
  };
}

export function useSingleCategory(slug: string) {
  const queryClient = useQueryClient();
  const categoryQuery = useQuery({
    queryKey: ["categories", slug],
    queryFn: () => getSingleCat(slug),
  });

  return {
    category: categoryQuery.data || null,
    isLoading: categoryQuery.isLoading,
    error: categoryQuery.error,
  };
}
