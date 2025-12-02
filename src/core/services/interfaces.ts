import { Product, Category, Faq, PricingType, User } from "@prisma/client";

// We can decouple from Prisma types if we want pure abstraction, 
// but for MVP reusing Prisma generated types in interfaces is practical.
// If strict decoupling is needed, we'd define DTOs. For now, I'll use Prisma types.

export interface IUserService {
    getProfile(id: string): Promise<User | null>;
    updateProfile(id: string, data: Partial<User>): Promise<User>;
}

export interface IAuthService {
    getCurrentSession(): Promise<{ user: User; session: any } | null>;
}

export interface IProductService {
    getProducts(skip?: number, take?: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product>;
    updateProduct(id: string, data: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}

export interface ICategoryService {
    getCategories(): Promise<Category[]>; // Should return tree or flat list? Flat list is easier for now, tree logic in UI or service helper
    getCategoryById(id: string): Promise<Category | null>;
    createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category>;
    updateCategory(id: string, data: Partial<Category>): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
}

export interface IFaqService {
    getFaqs(): Promise<Faq[]>;
    getFaqById(id: string): Promise<Faq | null>;
    createFaq(data: Omit<Faq, "id" | "createdAt" | "updatedAt">): Promise<Faq>;
    updateFaq(id: string, data: Partial<Faq>): Promise<Faq>;
    deleteFaq(id: string): Promise<void>;
    reorderFaqs(items: { id: string; order: number }[]): Promise<void>;
}
