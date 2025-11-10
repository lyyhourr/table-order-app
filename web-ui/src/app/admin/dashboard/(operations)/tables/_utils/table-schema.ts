import z from "zod";

export const tableSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type TTableSchema = z.infer<typeof tableSchema>;

export type TTable = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};
