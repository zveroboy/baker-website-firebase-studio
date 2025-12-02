import { injectable } from "inversify";
import { IProductService } from "../../interfaces";
import { prisma } from "@/lib/db";
import { Product } from "@prisma/client";

@injectable()
export class RealProductService implements IProductService {
    async getProducts(skip: number = 0, take: number = 10): Promise<Product[]> {
        return await prisma.product.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        });
    }

    async getProductById(id: string): Promise<Product | null> {
        return await prisma.product.findUnique({
            where: { id }
        });
    }

    async createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
        return await prisma.product.create({
            data
        });
    }

    async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
        return await prisma.product.update({
            where: { id },
            data
        });
    }

    async deleteProduct(id: string): Promise<void> {
        await prisma.product.delete({
            where: { id }
        });
    }
}


