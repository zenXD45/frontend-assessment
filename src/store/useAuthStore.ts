import { create } from 'zustand';

// Zustand store is chosen because it is simple, has a tiny footprint, 
// allows built-in async actions without extra middleware (like redux-thunk),
// and requires far less boilerplate than Redux for a small-to-medium app.

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
