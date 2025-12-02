import { injectable } from "inversify";
import { IProductService } from "../../interfaces";
import { Product, PricingType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

@injectable()
export class MockProductService implements IProductService {
    private products: Product[] = [
        {
            id: "mock-1",
            name: "Mock Cake",
            description: "Delicious mock cake",
            pricingType: "PER_KILO",
            price: new Decimal(50),
            minWeight: new Decimal(1),
            availableQuantities: [],
            picture: null,
            categoryId: "cat-1",
            allergens: ["Gluten"],
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date()
        } as unknown as Product // Casting because Decimal mock might be tricky to match exact Prisma type structure in runtime
    ];

    async getProducts(skip: number = 0, take: number = 10): Promise<Product[]> {
        return this.products.slice(skip, skip + take);
    }

    async getProductById(id: string): Promise<Product | null> {
        return this.products.find(p => p.id === id) || null;
    }

    async createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
        const newProduct = {
            ...data,
            id: `mock-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        } as Product;
        this.products.push(newProduct);
        return newProduct;
    }

    async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error("Product not found");
        
        this.products[index] = { ...this.products[index], ...data };
        return this.products[index];
    }

    async deleteProduct(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }
}



