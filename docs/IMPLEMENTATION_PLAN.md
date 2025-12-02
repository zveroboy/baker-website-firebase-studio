# Implementation Plan

This plan outlines the step-by-step implementation of the Baker Personal Website, prioritized from simplest to most complex features. It follows the **Modular Vertical Slice Architecture**.

---

# Feature 0: User & Auth Management (Core)
**Goal**: Secure admin authentication and user profile management.
**Complexity**: Low (Leverages Better Auth)

## Phase 1: Core Domain
### Task 1: User Service
- [x] **Step 1: Interface**
  - Create `IUserService` in `src/core/services/interfaces.ts` (getProfile, updateProfile).
- [x] **Step 2: Implementations**
  - [x] Create `MockUserService` (In-memory user).
  - [x] Create `UserService` (Real) wrapping Prisma/Better Auth.
- [x] **Step 3: DI Registration**
  - Bind `IUserService` in `src/core/di/container.ts`.

## Phase 2: Admin Module
### Task 1: Admin Profile
- [x] **Step 1: Server Actions**
  - `updateProfileAction` in `src/modules/users/actions.ts`.
- [x] **Step 2: UI Components**
  - `ProfileForm` using Zod schema.
  - Update Login page to use standard UI components if needed.

---

# Feature 1: FAQ Management (Simplest)
**Goal**: Admin can manage FAQs (CRUD) and reorder them. Public users can view them.
**Complexity**: Low (Pure CRUD + Sort Order)

## Phase 1: Core Domain & Infrastructure
### Task 1: Define Domain Models
- [x] **Step 1: Update `schema.prisma`**
  - Ensure `Faq` model has `question`, `answer`, `order` fields.
- [x] **Step 2: Define Interfaces**
  - Create `IFaqService` in `src/core/services/interfaces.ts`.
- [x] **Step 3: Implement Services**
  - [x] Create `MockFaqService` in `src/core/services/implementations/mock/FaqService.ts` (In-memory array).
  - [x] Create `FaqService` (Real) in `src/core/services/implementations/real/FaqService.ts` (Prisma).
  - Implement `getAll`, `create`, `update`, `delete`, `reorder`.
- [x] **Step 4: DI Registration**
  - Bind `IFaqService` in `src/core/di/container.ts`.
  - Ensure toggle logic (`USE_MOCK_SERVICES`) selects correct implementation.

## Phase 2: Admin Module (Back-Office)
### Task 1: Admin UI
- [x] **Step 1: Create Schema**
  - Define `createFaqSchema` and `updateFaqSchema` in `src/modules/faq/schema.ts`.
- [x] **Step 2: Server Actions**
  - Implement `createFaqAction`, `updateFaqAction`, `deleteFaqAction` in `src/modules/faq/actions.ts`.
- [x] **Step 3: Components**
  - Create `FaqTable` (already have `FaqForm`).
  - Integrate `SortableList` (optional for MVP, or just input for order).
- [x] **Step 4: Page Integration**
  - Update `src/app/admin/(dashboard)/faq/page.tsx` to use real data (via Service).

## Phase 3: Public Module
### Task 1: Public Display
- [x] **Step 1: Public Component**
  - Create `FaqAccordion` in `src/modules/faq/components/FaqAccordion.tsx`.
- [x] **Step 2: Public Page**
  - Update `src/app/(web)/faq/page.tsx` to fetch FAQs via `FaqService`.

---

# Feature 2: Category Management
**Goal**: Admin can manage category hierarchy. Public sees products filtered by category.
**Complexity**: Low-Medium (Recursive Data Structure)

## Phase 1: Core Domain
### Task 1: Service Implementation
- [x] **Step 1: Interface**
  - Update `ICategoryService` to include `create`, `update`, `delete`.
- [x] **Step 2: Implementation**
  - [x] Create `MockCategoryService` (In-memory tree).
  - [x] Create `CategoryService` (Prisma) with logic to handle parent/child relationships.

## Phase 2: Admin Module
### Task 1: Admin Management
- [x] **Step 1: Components**
  - Create `CategoryForm` (with Parent Selector).
  - Create `CategoryTree` (visualize hierarchy).
- [x] **Step 2: Actions & Pages**
  - Implement server actions and Admin Page (`src/app/admin/categories/page.tsx`).

---

# Feature 3: Product Catalog (Medium)
**Goal**: Admin creates products (Cakes/Pastries). Public views them.
**Complexity**: Medium (Image Upload + Pricing Variants)

## Phase 1: Infrastructure (Storage)
### Task 1: Storage Service
- [ ] **Step 1: Interface**
  - Define `IStorageService` (upload, delete).
- [ ] **Step 2: Implementation**
  - [ ] Create `MockStorageService` (Returns dummy URLs).
  - [ ] Create `S3StorageService` using `@aws-sdk/client-s3`.
- [ ] **Step 3: DI Config**
  - Bind `IStorageService`.

## Phase 2: Product Domain
### Task 1: Enhanced Product Logic
- [ ] **Step 1: Update Service**
  - Ensure `ProductService` handles `pricingType` logic (Per Kilo vs Per Item).
  - Integrate `StorageService` for image handling.
  - [ ] Verify `MockProductService` handles all new logic.

## Phase 3: Admin Module
### Task 1: Product Management
- [ ] **Step 1: Forms**
  - Update `ProductForm` to handle conditional fields (Weight vs Quantity).
  - Implement Image Upload component using `useImageUpload` hook.
- [ ] **Step 2: Actions**
  - `createProductAction` should handle file upload + DB creation.

## Phase 4: Public Catalog
### Task 1: Catalog Views
- [ ] **Step 1: Components**
  - Update `ProductCard` to correctly display "per kg" or "per item".
  - Create `ProductFilters` (by Category).
- [ ] **Step 2: Pages**
  - Update `src/app/(web)/catalog/page.tsx`.

---

# Feature 4: Public Order Placement (High)
**Goal**: Customer places an order.
**Complexity**: High (Validation, Calculations, State)

## Phase 1: Order Domain
### Task 1: Order Logic
- [ ] **Step 1: Interface & Service**
  - Create `IOrderService`.
  - [ ] Create `MockOrderService` (In-memory).
  - [ ] Create `OrderService` (Real).
  - Implement `createOrder` with pricing validation (e.g., check if `weight` is valid step).
  - Implement `calculateTotal(product, quantity)`.

## Phase 2: Public Module
### Task 1: Order Form
- [ ] **Step 1: Zod Schema**
  - `orderSchema` with complex refinements (conditional validation based on product type).
- [ ] **Step 2: Form Logic**
  - Update `OrderForm.tsx` to use `orderSchema` and `createOrderAction`.
  - Ensure real-time price updates.

---

# Feature 5: Admin Order Management (Complex)
**Goal**: Admin manages lifecycle (Confirm -> Deliver).
**Complexity**: High (State Machine, delivery fees)

## Phase 1: Order Workflow
### Task 1: Status Transitions
- [ ] **Step 1: Service Logic**
  - Implement `updateStatus(id, status, metadata)`.
  - Rule: If `status` -> `CONFIRMED` and `delivery` -> Require `fee` and `timeSlot`.

## Phase 2: Admin Module
### Task 1: Dashboard
- [ ] **Step 1: Components**
  - `OrderTable` with filters (New, Confirmed, etc.).
  - `OrderKanban` (optional nice-to-have).
- [ ] **Step 2: Order Details**
  - `OrderDetailsView`: Show customer info, product, allow status changes.
  - `StatusChangeDialog`: Form to input delivery fee when confirming.

---

# Feature 6: Gallery (Bonus)
**Goal**: Simple image gallery.
**Complexity**: Low (Reuse Storage Service)

## Phase 1: Implementation
### Task 1: Full Vertical Slice
- [ ] **Step 1: Reuse Patterns**
  - Clone patterns from FAQ/Product (Service -> Action -> Component).
  - Reuse `StorageService` for images.
