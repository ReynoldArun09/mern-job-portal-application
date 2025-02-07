import { useAuthStore } from "@/stores/useAuthStore";
import * as React from "react";
export default function UseAuth() {
  const { isFetching, VerifyAuth, user } = useAuthStore();

  React.useEffect(() => {
    VerifyAuth();
  }, [VerifyAuth]);

  return {
    isFetching,
    user,
  };
}
