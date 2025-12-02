# Product Requirements Document (PRD)

> **Legend:** `[MVP]` ships in the first release, `[Future]` is deferred. Customer order creation intentionally stays unauthenticated for MVP; authentication exists only for admins with no signup, forgot password, or token refresh flows.

## Overview [MVP]
A personal bakery website with public storefront and admin management system. The platform supports both cakes (sold by weight/kilo) and pastries (sold per item) with a flexible pricing model. Language: Russian.

## Data Models [MVP]

### User [MVP]
- Name
- Email  
- Password
- Role (admin)
- Created At
- Updated At

### Category [MVP]
- Name
- Description
- Parent Category ID (nullable - for tree structure)
- Created At
- Updated At

### Product (Cakes & Pastries) [MVP]
- Name
- Description
- Pricing Type (per_kilo/per_item)
- Price (Decimal, precision 2)
- Minimum Weight (for per_kilo products, in kg)
- Available Quantities (for per_item products: 6, 12, 18)
- Picture
- Category ID
- Allergens (multiple select from enum)
- Is Available (boolean)
- Created At
- Updated At


### Order [MVP]
- Order Number
- Customer Name
- Customer Email
- Customer Phone
- Message
- Product ID
- Quantity (weight in kg for cakes with 0.5kg steps, units for pastries: 6/12/18)
- Total Price (Decimal, precision 2)
- Status (new/confirmed/started/ready/delivered/completed)
- Is Cancelled (boolean)
- Cancelled At (timestamp, nullable)
- Cancellation Reason (text, nullable)
- Delivery Type (pickup/delivery)
- Pickup Date/Time (if pickup)
- Delivery Date/Time (if delivery)
- Delivery Address (if delivery)
- Delivery Fee (Decimal, precision 2, if delivery, set by admin)
- Delivery Time Slot (if delivery, set by admin)
- Created At
- Updated At

### FAQ [MVP]
- Question
- Answer
- Order (for sorting) [default: 100]
- Created At
- Updated At

### Gallery [MVP]
- Picture
- Title
- Description
- Order (for sorting)
- Created At
- Updated At

### Allergen (Enum/Dictionary) [MVP]
- Gluten
- Dairy
- Eggs
- Nuts
- Soy
- Others as needed

## Public Features [MVP]

### Homepage [MVP]
- Static content about bakery
- Featured products
- Contact information
- Links to catalog, gallery, FAQ

### Product Catalog [MVP]
- Grid view with pagination
- Category filtering
- Each product shows: picture, name, description, price (with unit: per kg/per item), allergens
- "Order" button leads to order form

### Order Form [MVP]
- Customer details (name, email, phone)
- Product selection (pre-selected if coming from catalog)
- Quantity input:
  - For per_kilo: weight selector with 0.5kg steps (minimum as configured)
  - For per_item: dropdown with available quantities (6, 12, or 18)
- Delivery type selection (pickup/delivery)
- Delivery address (if delivery selected)
- Preferred date/time
- Special message
- Total price display (auto-calculated)
- CAPTCHA for spam protection
- Order submission creates order with "new" status
- [Future] Customer accounts, authenticated ordering, order history, and customer-facing password flows

### FAQ Page [MVP]
- Accordion-style Q&A display
- Sorted by admin-defined order

### Gallery [MVP]
- Image grid with lightbox
- Sorted by admin-defined order

## Admin Features [MVP]

### Authentication (mixed scope)
- [MVP] Login page with email/password (no signup, forgot password, or token refresh)
- [MVP] Session management handled by Better Auth using single-session tokens; admins re-authenticate manually when tokens expire
- [MVP] Protected admin routes
- [Future] Admin self-serve signup, password recovery flows, token refresh/rotation, and advanced session policies

### Dashboard [MVP]
- Recent orders summary
- Orders by status
- Quick actions

### Order Management [MVP]
- List all orders with filters (status, date, cancelled/active)
- View order details
- Update order status
- Add delivery fee and time slot when confirming
- Cancel orders (sets is_cancelled flag, preserves current status)

### Product Management [MVP]
- CRUD operations
- Pricing type selection (per_kilo/per_item)
- Price input with appropriate unit label
- For per_kilo products: set minimum weight
- For per_item products: select available quantities (6, 12, 18)
- Image upload to S3
- Allergen selection
- Availability toggle
- Category assignment (with tree navigation)

### Category Management [MVP]
- CRUD operations
- Parent category selection (tree structure)
- View category hierarchy


### FAQ Management [MVP]
- CRUD operations
- Reorder items

### Gallery Management [MVP]
- Upload images to S3
- Add titles/descriptions
- Reorder items

## Pricing Logic [MVP]
- **Per Kilo Products (Cakes)**: 
  - Customer selects weight in 0.5kg increments (minimum weight enforced)
  - Total = weight × price per kilo
- **Per Item Products (Pastries)**: 
  - Customer selects from available quantities (6, 12, or 18 items)
  - Total = quantity × price per item
- **Delivery Fee**: Added by admin when confirming orders with delivery

## Business Rules [MVP]
- **Weight Selection**: Customers can only select weights in 0.5kg increments
- **Minimum Weight**: Each per_kilo product has a minimum weight requirement
- **Quantity Restrictions**: Per_item products limited to 6, 12, or 18 items only
- **Category Hierarchy**: Categories can be nested for better organization (e.g., Cakes > Wedding Cakes)

## Order Workflow [MVP]
1. Customer submits order → Status: "new"
2. Admin reviews and confirms → Status: "confirmed"
   - **Validation Rule**: If Delivery Type is 'delivery', Admin MUST set `Delivery Fee` and `Delivery Time Slot` before transition.
3. Baker starts preparation → Status: "started"
4. Order ready for pickup/delivery → Status: "ready"
5. Customer receives order → Status: "delivered" (or "picked up")
6. Order complete → Status: "completed"

**Cancellation**: Admin can cancel at any time by setting is_cancelled = true (preserves current status for reporting)

## Technical Requirements [MVP]
- Use Prisma for database operations
- Use InversifyJS for dependency injection. Keep in a services folder. Next.js action for server actions should call InversifyJS container to get the service if needed.
- Payment processing handled externally
- Mobile-responsive design
- SEO-optimized public pages
- Secure admin authentication
- Form validation and sanitization
  - Use Zod schemas for strict input validation
  - Sanitize HTML from text inputs (e.g., messages)
- **Currency Handling**: Use Decimal types (not Float) for all monetary values to ensure precision

## Future Enhancements [Future]
- [Future] **Security Hardening Phase**:
  - [Future] Rate limiting (Admin login & Order submission)
  - [Future] Audit Logging (Admin actions, Order changes)
- [Future] Admin signup, password recovery, token refresh/rotation, and richer session controls
- [Future] Multiple products per order
- [Future] Customer accounts and order history
- [Future] Automated email notifications
- [Future] Seasonal pricing
- [Future] Business hours and blackout dates
- [Future] Inventory tracking
- [Future] Advanced analytics
- [Future] Custom product attributes/properties
- [Future] More flexible quantity options
