import { create } from 'zustand';
import apiClient from '../api/client';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  company?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, firstName: string, lastName: string, password: string, company?: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.login(email, password);
      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (email: string, firstName: string, lastName: string, password: string, company?: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.signup(email, firstName, lastName, password, company);
      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false });
  },

  getProfile: async () => {
    try {
      const response = await apiClient.getProfile();
      set({ user: response.data.data });
    } catch (error) {
      console.error('Failed to get profile:', error);
    }
  },

  updateProfile: async (data: any) => {
    try {
      const response = await apiClient.updateProfile(data);
      set({ user: response.data.data });
    } catch (error) {
      throw error;
    }
  },
}));
