import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/common/loading-spinner";
import UseAuth from "../hooks/apis/use-auth";

export default function AuthRoute() {
  const { user, isFetching } = UseAuth();

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (!user) return <Outlet />;

  return <Navigate to="/" replace />;
}
