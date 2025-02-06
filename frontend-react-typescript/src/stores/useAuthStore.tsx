import { create } from "zustand";
import { SignInSchemaType, SignUpSchemaType } from "../validations/auth-schema";
import axiosInstance from "../lib/axios";
import { UserType } from "./types";
import { AxiosError } from "axios";

type AuthState = {
  isFetching: boolean;
  user: UserType | null;
};

type AuthActionType = {
  SignupUser: (values: SignUpSchemaType) => void;
  SignInUser: (values: SignInSchemaType) => void;
  SignOutUser: () => void;
  VerifyAuth: () => void;
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
  VerifyAuth: async () => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get("/user/verify");
      set({ user: response.data.data, isFetching: false });
    } catch (error) {
      set({ isFetching: false, user: null });
      if (error instanceof AxiosError) {
        return;
      }
    }
  },
}));
