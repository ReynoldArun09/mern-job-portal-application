import { Outlet } from "react-router-dom";
import AuthHeader from "../components/web/auth/auth-header";

export default function AuthLayout() {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  );
}
