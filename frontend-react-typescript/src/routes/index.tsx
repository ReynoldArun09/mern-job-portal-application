import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/admin.layout";
import AuthLayout from "../layout/auth.layout";
import SiteLayout from "../layout/site.layout";
import AdminDashboard from "../pages/admin/admin.dashboard";
import SignInPage from "../pages/auth/signin.page";
import HomePage from "../pages/site/home.page";
import AuthRoute from "./auth.route";
import ProtectedRoute from "./protected.route";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignInPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
