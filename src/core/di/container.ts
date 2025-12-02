import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IProductService, IFaqService } from "../services/interfaces";
import { MockProductService } from "../services/implementations/mock/ProductService";
import { MockFaqService } from "../services/implementations/mock/FaqService";

const container = new Container();

// Environment variable to toggle mocks
const useMocks = process.env.USE_MOCK_SERVICES === "true";

if (useMocks) {
    container.bind<IProductService>(TYPES.ProductService).to(MockProductService);
    container.bind<IFaqService>(TYPES.FaqService).to(MockFaqService);
} else {
    // Lazy load real implementation to avoid Prisma initialization in mock mode
    const { RealProductService } = require("../services/implementations/real/ProductService");
    const { RealFaqService } = require("../services/implementations/real/FaqService");
    
    container.bind<IProductService>(TYPES.ProductService).to(RealProductService);
    container.bind<IFaqService>(TYPES.FaqService).to(RealFaqService);
}

export { container };
