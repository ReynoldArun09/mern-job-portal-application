import { create } from "zustand";
import { SignInSchemaType, SignUpSchemaType } from "../validations/auth-schema";
import axiosInstance from "../lib/axios";

type AuthState = {
  isFetching: boolean;
  user: null;
};

type AuthActionType = {
  SignupUser: (values: SignUpSchemaType) => void;
  SignInUser: (values: SignInSchemaType) => void;
  SignOutUser: () => void;
};

type initialState = AuthState & AuthActionType;

export const useAuthStore = create<initialState>((set) => ({
  isFetching: false,
  user: null,
  SignInUser: async (values: SignInSchemaType) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.post("/auth/signin", values);
      set({ user: response.data.data, isFetching: false });
    } catch (error) {
      set({ isFetching: false });
      console.log(error);
    }
  },
  SignupUser: async (values: SignUpSchemaType) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.post("/auth/signup", values);
      set({ user: response.data.data, isFetching: false });
    } catch (error) {
      set({ isFetching: false });
      console.log(error);
    }
  },
  SignOutUser: async () => {
    set({ isFetching: true });
    try {
      await axiosInstance.post("/auth/signout");
      set({ user: null, isFetching: false });
    } catch (error) {
      set({ isFetching: false });
      console.log(error);
    }
  },
}));
