# Frontend Technical Assessment

This project is a modern, responsive web application built with Next.js, Material-UI (MUI), and Zustand. It integrates with the [DummyJSON API](https://dummyjson.com/) to provide user authentication, and data for users and products.

## Technologies Used

* **Framework:** Next.js (App Router, TypeScript)
* **UI Library:** Material-UI (MUI) v5
* **State Management:** Zustand
* **Authentication:** NextAuth.js (Credentials Provider)

## Why Zustand?

Zustand was chosen for state management because it provides a much simpler and less boilerplate-heavy alternative to Redux. It has a tiny footprint and handles async actions out-of-the-box without needing middleware like Redux Thunk or Saga. For a small to medium-sized application like this, Zustand offers an excellent developer experience while easily satisfying all data management and client-side caching requirements.

## Setup Instructions

1. **Clone the repository** (or use the provided directory).
2. **Navigate to the project folder:**
   ```bash
   cd frontend-assessment
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Environment Variables:**
   You don't strictly need a `.env` file since this uses DummyJSON, but for NextAuth in production you must set a secret. You can optionally create a `.env.local` file at the root:
   ```
   NEXTAUTH_SECRET=your_super_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```
6. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Login Details

Use any user from the DummyJSON users endpoint to log in. For example:
* **Username:** `emilys`
* **Password:** `emilyspass`

## Architecture Highlights

* **Caching:** Zustand stores (`useUsersStore` and `useProductsStore`) implement a caching strategy by indexing API responses with query parameters. This avoids repeating network requests if a user navigates between previously loaded pages.
* **Performance:** `React.memo` is used for individual item cards (`UserCard` and `ProductCard`) to prevent unnecessary re-renders. `useCallback` is used for event handlers like pagination.
* **Authentication Sync:** NextAuth handles the secure session cookie, and a helper component (`SessionSync`) mirrors the token into the Zustand `useAuthStore` as requested.
