import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/site/home-page";
import SigninPage from "../pages/auth/signin-page";
import SignupPage from "../pages/auth/signup-page";
import AuthRoute from "./auth-route";
import AuthLayout from "../layout/auth-layout";
import AdminLayout from "../layout/admin-layout";
import DashboardPage from "../pages/admin/dashboard-page";
import ProtectedRoute from "./protected-route";
import SiteLayout from "../layout/site-layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/" element={<AuthRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/auth/sign-in" element={<SigninPage />} />
            <Route path="/auth/sign-up" element={<SignupPage />} />
          </Route>
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
