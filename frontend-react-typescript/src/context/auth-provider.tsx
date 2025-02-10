/* eslint-disable react-refresh/only-export-components */
import { AxiosError } from "axios";
import React from "react";
import axiosInstance from "../lib/axios";
import { UserType } from "../stores/types";
import { useAuthStore } from "../stores/useAuthStore";

type AuthContextType = {
  user: UserType | null;
  isAuthFetching: boolean;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, user } = useAuthStore();
  const [isAuthFetching, setIsAuthFetching] = React.useState(true);
  React.useEffect(() => {
    const VerifyUser = async () => {
      setIsAuthFetching(true);
      try {
        const response = await axiosInstance.get("/user/verify");
        setUser(response.data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          return;
        }
      } finally {
        setIsAuthFetching(false);
      }
    };
    VerifyUser();
  }, [setUser]);

  return <AuthContext value={{ user, isAuthFetching }}>{children}</AuthContext>;
}
