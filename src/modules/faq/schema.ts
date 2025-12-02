import { z } from "zod";

export const createFaqSchema = z.object({
    question: z.string().min(5, "Вопрос должен быть не менее 5 символов"),
    answer: z.string().min(10, "Ответ должен быть не менее 10 символов"),
    order: z.number().int().default(100)
});

export const updateFaqSchema = createFaqSchema.partial().extend({
    id: z.string()
});

export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;

