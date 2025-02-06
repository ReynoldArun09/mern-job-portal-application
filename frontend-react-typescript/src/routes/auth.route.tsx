import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function AuthRoute() {
  const { isAuth, user } = useAuthContext();
  console.log(user);

  if (isAuth) {
    return <h1>loading..</h1>;
  }

  if (!user) {
    <Outlet />;
  }

  return <Navigate to={"/"} replace />;
}
