import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  fetchProfile: async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/me", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        set({ user: data });
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
    }
  },
  logout: () => {
    set({ user: null });
    document.cookie = "Authentication=; Max-Age=0";
  },
}));
