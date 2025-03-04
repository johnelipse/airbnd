import { Category, Property } from "@prisma/client";

// Server action return types
export type QueriesResponse = {
  data: Property[];
  error?: string;
};
export type QueriesCatResponse = {
  data: Category[];
  error?: string;
};

// For single contact queries
export type SingleQueryResponse = {
  data: Property | null;
  error?: string;
};
export type SingleCatQueryResponse = {
  data: Category | null;
  error?: string;
};

// For mutation operations
export type MutationResponse = {
  success: boolean;
  data?: Property;
  error?: string;
};
