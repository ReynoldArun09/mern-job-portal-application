import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoute() {
  const { isAuth, user } = useAuthContext();
  const role = user?.role;

  if (isAuth && role === "recruiter") {
    return <h1>loading..</h1>;
  }

  if (!isAuth && user) {
    <Outlet />;
  }

  return <Navigate to={"/signin"} replace />;
}
