import z from "zod";
import { TCategories } from "../../category/_utils/category-schema";

export const menuItemSchema = z.object({
  name: z.string().min(1).max(100),
  image: z.string().min(1, "Image is required"),
  price: z.number().min(0),
  categoryId: z.number().min(1, "Category is required"),
  isAvailable: z.boolean(),
  description: z.string().max(500).optional(),
});

export type TMenuItemSchema = z.infer<typeof menuItemSchema>;

export type TMenuItemList = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: Pick<TCategories, "id" | "name">;
  available: boolean;
  description?: string;
};
