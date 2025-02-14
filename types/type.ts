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

export type RegisterFormProps = {
  name: string;
  phone: string;
  password: string;
  email: string;
  image: string;
};
export type LoginFormProps = {
  password: string;
  email: string;
};
