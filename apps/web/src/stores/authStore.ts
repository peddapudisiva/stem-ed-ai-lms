import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role } from '../types/auth';
import { DEMO_USERS } from '../data/users';

interface AuthState {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  loginDemo: (role: Role) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,

      loginDemo: async (role: Role) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 600));
        const demoUser = DEMO_USERS[role];
        set({ user: demoUser, role: demoUser.role, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, role: null, isAuthenticated: false });
      },
    }),
    {
      name: 'stemed-auth-storage',
    }
  )
);
