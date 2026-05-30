import { create } from 'zustand';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
  images: string[];
  description: string;
}

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  categories: string[];
  // Caching strategy: store data indexed by query parameters
  // Why: prevents re-fetching when paginating back and forth or searching the same term twice.
  cache: Record<string, { products: Product[], total: number }>;
  selectedProduct: Product | null;
  fetchProducts: (skip: number, limit: number, query?: string, category?: string) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,
  categories: [],
  cache: {},
  selectedProduct: null,
  
  fetchProducts: async (skip, limit, query = '', category = '') => {
    const cacheKey = `${skip}-${limit}-${query}-${category}`;
    const cachedData = get().cache[cacheKey];

    if (cachedData) {
      set({ products: cachedData.products, total: cachedData.total, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      
      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else if (query) {
        url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`;
      }
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      
      const data = await res.json();
      
      set((state) => ({
        products: data.products,
        total: data.total,
        loading: false,
        cache: { ...state.cache, [cacheKey]: { products: data.products, total: data.total } }
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCategories: async () => {
    if (get().categories.length > 0) return; // already fetched
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();
      // the API returns an array of objects or strings depending on version, let's extract strings
      const cats = data.map((c: any) => typeof c === 'string' ? c : c.slug);
      set({ categories: cats });
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  },

  fetchProductById: async (id: string) => {
    set({ loading: true, error: null, selectedProduct: null });
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product details');
      
      const data = await res.json();
      set({ selectedProduct: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  }
}));
