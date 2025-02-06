import React from "react";
import { useAuthStore } from "../stores/useAuthStore";

export default function useAuth() {
  const { user, isFetching, VerifyAuth } = useAuthStore();

  React.useEffect(() => {
    VerifyAuth();
  }, [VerifyAuth]);

  return { user, isFetching };
}
