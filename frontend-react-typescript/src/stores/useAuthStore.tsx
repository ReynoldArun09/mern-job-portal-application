import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { SignInSchemaType, SignUpSchemaType } from "../validations/auth-schema";
import { UserType } from "./types";

type AuthState = {
  isFetching: boolean;
  user: UserType | null;
};

type AuthActionType = {
  SignupUser: (values: SignUpSchemaType) => void;
  SignInUser: (values: SignInSchemaType) => void;
  SignOutUser: () => void;
  setUser: (user: UserType) => void;
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
      toast.success(response.data.message);
    } catch (error: unknown) {
      set({ isFetching: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong !!");
      }
    }
  },
  SignupUser: async (values: SignUpSchemaType) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.post("/auth/signup", values);
      set({ user: response.data.data, isFetching: false });
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: unknown) {
      set({ isFetching: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong !!");
      }
    }
  },
  SignOutUser: async () => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.post("/auth/signout");
      set({ user: null, isFetching: false });
      toast.success(response.data.message);
    } catch (error: unknown) {
      set({ isFetching: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong !!");
      }
    }
  },
  setUser: (user: UserType) => set(() => ({ user })),
}));
