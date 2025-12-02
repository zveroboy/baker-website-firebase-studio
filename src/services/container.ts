import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IProductService } from "./interfaces";
import { MockProductService } from "./implementations/mock/ProductService";

const container = new Container();

// Environment variable to toggle mocks
const useMocks = process.env.USE_MOCK_SERVICES === "true";

if (useMocks) {
    container.bind<IProductService>(TYPES.ProductService).to(MockProductService);
} else {
    // Lazy load real implementation to avoid Prisma initialization in mock mode
    const { RealProductService } = require("./implementations/real/ProductService");
    container.bind<IProductService>(TYPES.ProductService).to(RealProductService);
}

export { container };

