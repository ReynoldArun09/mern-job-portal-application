import LoadingSpinner from "@/components/common/loading-spinner";
import UseAuth from "@/hooks/apis/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, isFetching } = UseAuth();

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
