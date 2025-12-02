import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(2, "Название должно быть не менее 2 символов"),
    description: z.string().optional(),
    parentId: z.string().nullable().optional()
});

export const updateCategorySchema = createCategorySchema.partial().extend({
    id: z.string()
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

