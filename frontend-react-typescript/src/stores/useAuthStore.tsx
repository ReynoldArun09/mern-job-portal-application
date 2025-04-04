import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { SignInSchemaType, SignUpSchemaType } from "@/validations/auth-schema";
import { UserType } from "./types";

type AuthState = {
  isFetching: boolean;
  user: UserType | null;
};

type AuthActionType = {
  actions: {
    SignupUser: (values: SignUpSchemaType) => void;
    SignInUser: (values: SignInSchemaType) => void;
    SignOutUser: () => void;
    setUser: (user: UserType) => void;
  };
};

type initialState = AuthState & AuthActionType;

export const useAuthStore = create<initialState>((set) => ({
  isFetching: false,
  user: null,
  actions: {
    SignInUser: async (values: SignInSchemaType) => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.post("/auth/signin", values);
        set({ user: response.data.data });
        toast.success(response.data.message);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Something went wrong !!");
        }
      } finally {
        set({ isFetching: false });
      }
    },
    SignupUser: async (values: SignUpSchemaType) => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.post("/auth/signup", values);
        set({ user: response.data.data });
        toast.success(response.data.message);
        return response.data.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Something went wrong !!");
        }
      } finally {
        set({ isFetching: false });
      }
    },
    SignOutUser: async () => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.post("/auth/signout");
        set({ user: null });
        toast.success(response.data.message);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Something went wrong !!");
        }
      } finally {
        set({ isFetching: false });
      }
    },
    setUser: (user: UserType) => set(() => ({ user })),
  },
}));

export const useUserData = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isFetching);
export const useAuthActions = () => useAuthStore((state) => state.actions);
