import * as React from "react";
import { AuthContext } from "@/context/auth-provider";
export default function UseAuth() {
  const context = React.use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const { isAuthFetching, user } = context;

  return {
    isAuthFetching,
    user,
  };
}
