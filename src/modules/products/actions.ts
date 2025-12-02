"use server";

import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { IProductService } from "@/core/services/interfaces";
import { Product } from "@prisma/client";

export async function getProductsAction() {
    const productService = container.get<IProductService>(TYPES.ProductService);
    const products = await productService.getProducts();
    return products;
}


