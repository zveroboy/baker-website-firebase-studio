import { injectable } from "inversify";
import { ICategoryService } from "../../interfaces";
import { Category } from "@prisma/client";

@injectable()
export class MockCategoryService implements ICategoryService {
    private categories: Category[] = [
        {
            id: "cat-1",
            name: "Торты",
            description: "Вкусные торты",
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "cat-2",
            name: "Пирожные",
            description: "Сладкие пирожные",
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "cat-3",
            name: "Свадебные торты",
            description: null,
            parentId: "cat-1",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    async getCategories(): Promise<Category[]> {
        return this.categories;
    }

    async getCategoryById(id: string): Promise<Category | null> {
        return this.categories.find(c => c.id === id) || null;
    }

    async createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
        const newCategory: Category = {
            ...data,
            id: `mock-cat-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
        const index = this.categories.findIndex(c => c.id === id);
        if (index === -1) throw new Error("Category not found");

        this.categories[index] = { ...this.categories[index], ...data, updatedAt: new Date() };
        return this.categories[index];
    }

    async deleteCategory(id: string): Promise<void> {
        // Recursive delete simulation? Or just block if has children? 
        // For mock, simple delete is fine.
        this.categories = this.categories.filter(c => c.id !== id);
    }
}


