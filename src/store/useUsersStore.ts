import { create } from 'zustand';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company: {
    name: string;
  };
}

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  // Cache to store results by query key (e.g., 'skip-limit-query')
  // This avoids redundant network requests if the user navigates back to a previously loaded page.
  cache: Record<string, { users: User[], total: number }>;
  selectedUser: User | null;
  fetchUsers: (skip: number, limit: number, query?: string) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  error: null,
  cache: {},
  selectedUser: null,
  fetchUsers: async (skip, limit, query = '') => {
    const cacheKey = `${skip}-${limit}-${query}`;
    const cachedData = get().cache[cacheKey];

    // If data for this query exists in cache, use it
    if (cachedData) {
      set({ users: cachedData.users, total: cachedData.total, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const url = query
        ? `https://dummyjson.com/users/search?q=${query}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch users');
      
      const data = await res.json();
      
      set((state) => ({
        users: data.users,
        total: data.total,
        loading: false,
        cache: { ...state.cache, [cacheKey]: { users: data.users, total: data.total } }
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  
  fetchUserById: async (id: string) => {
    set({ loading: true, error: null, selectedUser: null });
    try {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch user details');
      
      const data = await res.json();
      set({ selectedUser: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
