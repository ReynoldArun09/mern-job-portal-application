import * as React from "react";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";
import HomePage from "../../pages/site/home-page";
import BrowsePage from "../../pages/site/browse-page";
import JobsPage from "../../pages/site/jobs-page";
import DescriptionPage from "../../pages/site/description-page";
import ProfilePage from "../../pages/site/profile-page";

const SigninPage = React.lazy(() => import("@/pages/auth/signin-page"));
const SignupPage = React.lazy(() => import("@/pages/auth/signup-page"));
const DashboardPage = React.lazy(() => import("@/pages/admin/dashboard-page"));
const ApplicantsListPage = React.lazy(() => import("@/pages/admin/applicants-list-page"));
const JobListPage = React.lazy(() => import("@/pages/admin/job-list-page"));
const CompanyListPage = React.lazy(() => import("@/pages/admin/company-list-page"));

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SigninPage /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignupPage /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <DashboardPage /> },
  { path: PROTECTED_ROUTES.APPLICANTS_LIST, element: <ApplicantsListPage /> },
  { path: PROTECTED_ROUTES.JOB_LIST, element: <JobListPage /> },
  { path: PROTECTED_ROUTES.COMPANY_LIST, element: <CompanyListPage /> },
];

export const baseRoutePath = [
  { path: BASE_ROUTE.HOME, element: <HomePage /> },
  { path: BASE_ROUTE.BROWSE, element: <BrowsePage /> },
  { path: BASE_ROUTE.JOBS, element: <JobsPage /> },
  { path: BASE_ROUTE.DESCRIPTION, element: <DescriptionPage /> },
  { path: BASE_ROUTE.PROFILE, element: <ProfilePage /> },
];
