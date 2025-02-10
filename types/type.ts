import { Category, Property } from "@prisma/client";
import { types } from "util";

export type CategoryProps = {
  title: string;
  image: string;
  slug: string;
};
export type ResProps = {
  property: Property;
  category: Category;
};
