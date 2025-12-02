"use server";

import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { ICategoryService } from "@/core/services/interfaces";
import { createCategorySchema, updateCategorySchema } from "./schema";
import { revalidatePath } from "next/cache";
import { Category } from "@prisma/client";

const getCategoryService = () => container.get<ICategoryService>(TYPES.CategoryService);

export async function getCategoriesAction(): Promise<Category[]> {
    const service = getCategoryService();
    return await service.getCategories();
}

export async function createCategoryAction(data: unknown) {
    const result = createCategorySchema.safeParse(data);
    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const service = getCategoryService();
    await service.createCategory(result.data);
    revalidatePath("/admin/categories");
    return { success: true };
}

export async function updateCategoryAction(id: string, data: unknown) {
    const result = updateCategorySchema.safeParse({ id, ...data as object });
    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const service = getCategoryService();
    await service.updateCategory(id, result.data);
    revalidatePath("/admin/categories");
    return { success: true };
}

export async function deleteCategoryAction(id: string) {
    const service = getCategoryService();
    await service.deleteCategory(id);
    revalidatePath("/admin/categories");
    return { success: true };
}


