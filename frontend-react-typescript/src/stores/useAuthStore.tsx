import { create } from "zustand";
import { UserType } from "./types";

import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

type AuthState = {
  isAuth: boolean;
  user: UserType | null;
};

type ActionState = {
  verifyAuth: () => void;
};

type initialState = AuthState & ActionState;

export const useAuthStore = create<initialState>((set) => ({
  user: null,
  isAuth: false,
  verifyAuth: async () => {
    set({ isAuth: true });
    try {
      const response = await axiosInstance.get("/user/verify");
      set({ user: response.data.data, isAuth: false });
    } catch (error) {
      set({ isAuth: false, user: null });
      if (error instanceof AxiosError) {
        return;
      }
    }
  },
}));
