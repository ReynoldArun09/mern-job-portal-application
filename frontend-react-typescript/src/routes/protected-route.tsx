import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { user, isFetching } = useAuth();

  if (isFetching) {
    return <h1>loading...</h1>;
  }

  if (!user) {
    <Navigate to="/" replace />;
  }

  return <Outlet />;
}
