import React from "react";
import { UserType } from "../stores/types";
import { useAuthStore } from "../stores/useAuthStore";

type AuthContextProps = {
  user: UserType | null;
  isAuth: boolean;
};

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isAuth, user, verifyAuth } = useAuthStore();

  React.useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return <AuthContext.Provider value={{ user, isAuth }}>{children}</AuthContext.Provider>;
}
