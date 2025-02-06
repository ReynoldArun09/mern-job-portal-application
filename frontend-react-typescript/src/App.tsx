import React from "react";
import AppRoutes from "./routes";
import { useAuthStore } from "./stores/useAuthStore";

export default function App() {
  const { verifyAuth } = useAuthStore();

  React.useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return <AppRoutes />;
}
