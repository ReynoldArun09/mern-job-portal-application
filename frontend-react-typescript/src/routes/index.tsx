import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/admin-layout";
import AuthLayout from "../layouts/auth-layout";
import SiteLayout from "../layouts/site-layout";
import AuthRoute from "./auth-route";
import { authenticationRoutePaths, baseRoutePath, protectedRoutePaths } from "./common/routes";
import ProtectedRoute from "./protected-route";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          {baseRoutePath.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route element={<AuthRoute />}>
          <Route element={<AuthLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {protectedRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
