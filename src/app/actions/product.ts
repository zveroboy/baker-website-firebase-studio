"use server";

import { container } from "@/services/container";
import { TYPES } from "@/services/types";
import { IProductService } from "@/services/interfaces";
import { Product } from "@prisma/client";

export async function getProductsAction() {
    const productService = container.get<IProductService>(TYPES.ProductService);
    const products = await productService.getProducts();
    return products;
}



