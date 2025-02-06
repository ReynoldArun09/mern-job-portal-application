import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthRoute() {
  const { user, isFetching } = useAuth();

  if (isFetching) {
    return <h1>loading...</h1>;
  }

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
