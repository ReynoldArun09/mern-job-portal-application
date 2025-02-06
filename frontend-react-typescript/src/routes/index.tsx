import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authenticationRoutePaths, baseRoutePath, protectedRoutePaths } from "./common/routes";
import SiteLayout from "../layout/site-layout";
import AuthLayout from "../layout/auth-layout";
import AuthRoute from "./auth-route";

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

        <Route>
          {protectedRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
