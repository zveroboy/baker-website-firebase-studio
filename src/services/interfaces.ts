import { Product, Category, PricingType } from "@prisma/client";

// We can decouple from Prisma types if we want pure abstraction, 
// but for MVP reusing Prisma generated types in interfaces is practical.
// If strict decoupling is needed, we'd define DTOs. For now, I'll use Prisma types.

export interface IProductService {
    getProducts(skip?: number, take?: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product>;
    updateProduct(id: string, data: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}

export interface ICategoryService {
    getCategories(): Promise<Category[]>;
}



