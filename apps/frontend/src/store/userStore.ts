import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface UserState {
  users: User[];
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const res = await fetch("http://localhost:5000/users", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        set({ users: data });
      }
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  },
}));
