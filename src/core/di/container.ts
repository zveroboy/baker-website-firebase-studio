import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IProductService, IFaqService, IAuthService, ICategoryService } from "../services/interfaces";
import { MockProductService } from "../services/implementations/mock/ProductService";
import { MockFaqService } from "../services/implementations/mock/FaqService";
import { MockAuthService } from "../services/implementations/mock/AuthService";
import { MockCategoryService } from "../services/implementations/mock/CategoryService";

const container = new Container();

// Environment variable to toggle mocks
const useMocks = process.env.USE_MOCK_SERVICES === "true";

if (useMocks) {
    container.bind<IProductService>(TYPES.ProductService).to(MockProductService);
    container.bind<IFaqService>(TYPES.FaqService).to(MockFaqService);
    container.bind<IAuthService>(TYPES.AuthService).to(MockAuthService);
    container.bind<ICategoryService>(TYPES.CategoryService).to(MockCategoryService);
} else {
    // Lazy load real implementation to avoid Prisma initialization in mock mode
    const { RealProductService } = require("../services/implementations/real/ProductService");
    const { RealFaqService } = require("../services/implementations/real/FaqService");
    const { RealAuthService } = require("../services/implementations/real/AuthService");
    const { RealCategoryService } = require("../services/implementations/real/CategoryService");
    
    container.bind<IProductService>(TYPES.ProductService).to(RealProductService);
    container.bind<IFaqService>(TYPES.FaqService).to(RealFaqService);
    container.bind<IAuthService>(TYPES.AuthService).to(RealAuthService);
    container.bind<ICategoryService>(TYPES.CategoryService).to(RealCategoryService);
}

export { container };
