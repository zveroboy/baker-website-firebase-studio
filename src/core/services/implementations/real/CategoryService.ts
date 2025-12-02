import { injectable } from "inversify";
import { ICategoryService } from "../../interfaces";
import { prisma } from "@/lib/db";
import { Category } from "@prisma/client";

@injectable()
export class RealCategoryService implements ICategoryService {
    async getCategories(): Promise<Category[]> {
        return await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
    }

    async getCategoryById(id: string): Promise<Category | null> {
        return await prisma.category.findUnique({
            where: { id }
        });
    }

    async createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
        return await prisma.category.create({
            data
        });
    }

    async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
        return await prisma.category.update({
            where: { id },
            data
        });
    }

    async deleteCategory(id: string): Promise<void> {
        // Check for children or products? 
        // Prisma usually throws foreign key error if we don't handle it.
        // We'll let it throw for now or we can implement check.
        await prisma.category.delete({
            where: { id }
        });
    }
}


