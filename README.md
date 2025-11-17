# React Listings Manager

This is a small Listings Manager application built with **React** and **TypeScript**.  
It is a simple marketplace admin interface where users can browse products, view details, filter, search, and sort products. The API is mocked using **MSW (Mock Service Worker)**, so the app works offline without a real backend.

---

## Features

- Display a paginated list of products
- Product card shows:
  - Name
  - Price
  - Category
  - Stock status
- Product details page with description
- Search products by name
- Filter by category and stock status
- Sort products by name, price, and stock
- Handle loading, empty, and error states gracefully
- Accessible controls for search, filter, sort, and pagination

---

## Technologies Used

- React
- TypeScript
- React Router
- MSW (Mock Service Worker)
- JSON for mock data
- CSS-in-JS (inline styles for components)

---

## Project Structure

src/
├─ features/
│ ├─ ProductsPage.tsx
│ └─ ProductDetails.tsx
├─ mocks/
│ ├─ data/products.json
│ └─ handlers.ts
├─ types.ts
└─ main.tsx


---

## Getting Started

### Prerequisites

- Node.js v22.x
- Yarn

### Setup

```bash
# Use the node version specified in .nvmrc
nvm use

# Install dependencies
yarn install

# One-time setup for MSW
npx msw init public --save

# Start the development server
yarn dev
Open http://localhost:5173 in your browser.

API (Mocked)
GET /products?query=&category=&page=1&limit=10 – fetch list of products with optional filters

GET /products/:id – fetch details of a single product

The data is stored in src/mocks/data/products.json and can be adjusted if needed.

Notes
Inline styles are used for simplicity; can be replaced with a proper CSS/SCSS setup

Loading, error, and empty states are handled for better UX

Pagination, sorting, and filtering are fully functional

Accessibility considerations included for interactive elements




Author
MD Yasin
Frontend Developer
GitHub Profile  https://github.com/mdyasin0