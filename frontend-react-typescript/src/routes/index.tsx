import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/site/home-page";
import SigninPage from "../pages/auth/signin-page";
import SignupPage from "../pages/auth/signup-page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/sign-in" element={<SigninPage />} />
        <Route path="/auth/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
