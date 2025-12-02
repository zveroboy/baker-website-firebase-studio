"use server";

import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { IFaqService } from "@/core/services/interfaces";
import { createFaqSchema, updateFaqSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { Faq } from "@prisma/client";

// Helper to get service
const getFaqService = () => container.get<IFaqService>(TYPES.FaqService);

export async function getFaqsAction(): Promise<Faq[]> {
    const service = getFaqService();
    return await service.getFaqs();
}

export async function createFaqAction(data: unknown) {
    const result = createFaqSchema.safeParse(data);
    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const service = getFaqService();
    await service.createFaq(result.data);
    revalidatePath("/admin/faq");
    revalidatePath("/faq"); // Update public page too
    return { success: true };
}

export async function updateFaqAction(id: string, data: unknown) {
    const result = updateFaqSchema.safeParse({ id, ...data as object });
    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const service = getFaqService();
    await service.updateFaq(id, result.data);
    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    return { success: true };
}

export async function deleteFaqAction(id: string) {
    const service = getFaqService();
    await service.deleteFaq(id);
    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    return { success: true };
}

export async function reorderFaqsAction(items: { id: string; order: number }[]) {
    const service = getFaqService();
    await service.reorderFaqs(items);
    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    return { success: true };
}
