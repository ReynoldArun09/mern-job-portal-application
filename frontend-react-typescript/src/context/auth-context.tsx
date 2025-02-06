import React from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { UserType } from "../stores/types";

type AuthContextProps = {
  user: UserType | null;
  isFetching: boolean;
};

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isFetching, user, VerifyAuth } = useAuthStore();

  React.useEffect(() => {
    VerifyAuth();
  }, [VerifyAuth]);

  return <AuthContext.Provider value={{ user, isFetching }}>{children}</AuthContext.Provider>;
}
