# Project: Baker Personal Website (Russian Version)

## Overview
A personal bakery website with a public storefront and admin management system, built with **Next.js 15 (App Router)**. The platform supports complex product pricing (Per Kilo vs. Per Item) and uses a **Feature-Based Modular Architecture**.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Dependency Injection**: InversifyJS
- **Validation**: Zod
- **Auth**: Better Auth
- **UI**: Tailwind CSS + Shadcn/UI

---

## Architecture & Code Style Rules

### 1. Modular Vertical Slice Architecture
Organize code by **Feature Module**, not by technical layer.
- **Modules (`src/modules/*`)**: Contains all UI, Server Actions, and Schemas for a specific feature (e.g., `orders`, `products`).
- **Core (`src/core/*`)**: Contains pure business logic, interfaces, and errors. **NO** UI code here.
- **Infrastructure (`src/lib/*`)**: Database clients, S3 adapters, Auth config.

### 2. Core Business Logic (The "Domain")
- **Services**: Business logic must live in `src/core/services`.
- **Interfaces**: Define `I[Name]Service` interfaces in `src/core/services/interfaces.ts`.
- **Dependency Injection**: Use `inversify` to inject dependencies. NEVER import `prisma` directly in UI components or Server Actions.
  ```typescript
  // GOOD:
  const productService = container.get<IProductService>(TYPES.ProductService);
  
  // BAD:
  import { prisma } from "@/lib/db";
  ```

### 3. Server Actions as Controllers
- Server Actions (`actions.ts` in modules) act as **Controllers**.
- **Responsibilities**: 
  1. Validate input using Zod.
  2. Resolve the Service from the DI Container.
  3. Call the Service method.
  4. Return DTOs/Results to the client.
- **Prohibited**: No direct DB access or complex business logic inside Server Actions.

### 4. Validation Strategy
- Use **Zod** for all data validation.
- Define schemas in `schema.ts` within the relevant module (e.g., `src/modules/orders/schema.ts`).
- Validate at the **entry point** (Server Actions and Forms).

### 5. Naming Conventions
- **Interfaces**: `I[Name]Service` (e.g., `IProductService`)
- **Implementations**: `[Name]Service` (e.g., `ProductService`, `MockProductService`)
- **Actions**: `[verb][Subject]Action` (e.g., `createOrderAction`)
- **Components**: PascalCase (e.g., `OrderForm.tsx`)

### 6. Data Access
- **Prisma**: Only accessed within `src/core/services` implementations.
- **Imports**: Use `@/lib/db` to access the Prisma client instance.

---

## Development Workflow

### Planning First
Before implementing complex features:
1. Create a **Plan** outlining the steps.
2. Use **Mermaid Diagrams** to visualize dependency flows if architectural changes are needed.
3. Update `docs/ARCHITECTURE-OVERVIEW.md` if the architecture changes.

### Testing & Mocks
- **Mandatory Mocks**: Every service MUST have a corresponding `Mock[Name]Service` implementation created alongside the real one (e.g., `MockOrderService`).
- **Implementation Plan**: Explicitly include "Create Mock Service" as a step in `docs/IMPLEMENTATION_PLAN.md` for every feature.
- Use **Mocks** for rapid UI development and testing without DB dependencies.
- Switch implementations via the DI Container (`src/core/di/container.ts`) using environment variables.

