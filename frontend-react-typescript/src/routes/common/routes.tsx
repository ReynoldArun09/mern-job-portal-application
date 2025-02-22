import * as React from "react";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";

const SigninPage = React.lazy(() => import("@/pages/auth/signin-page"));
const SignupPage = React.lazy(() => import("@/pages/auth/signup-page"));
const ApplicantsListPage = React.lazy(() => import("@/pages/admin/applicants-list-page"));
const JobsListPage = React.lazy(() => import("@/pages/admin/jobs-list-page"));
const CompanyListPage = React.lazy(() => import("@/pages/admin/companies-list-page"));
const ProfilePage = React.lazy(() => import("@/pages/site/profile-page"));
const DescriptionPage = React.lazy(() => import("@/pages/site/description-page"));
const JobsPage = React.lazy(() => import("@/pages/site/jobs-page"));
const BrowsePage = React.lazy(() => import("@/pages/site/browse-page"));
const HomePage = React.lazy(() => import("@/pages/site/home-page"));
const CreateCompanyPage = React.lazy(() => import("@/pages/admin/create-company-page"));
const CreateJobPage = React.lazy(() => import("@/pages/admin/create-job-page"));
const CompanySetupPage = React.lazy(() => import("@/pages/admin/company-setup-page"));

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SigninPage /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignupPage /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.APPLICANTS_LIST, element: <ApplicantsListPage /> },
  { path: PROTECTED_ROUTES.JOB_LIST, element: <JobsListPage /> },
  { path: PROTECTED_ROUTES.COMPANY_LIST, element: <CompanyListPage /> },
  { path: PROTECTED_ROUTES.CREATE_JOB, element: <CreateJobPage /> },
  { path: PROTECTED_ROUTES.CREATE_COMPANY, element: <CreateCompanyPage /> },
  { path: PROTECTED_ROUTES.COMPANY_SETUP, element: <CompanySetupPage /> },
];

export const baseRoutePath = [
  { path: BASE_ROUTE.HOME, element: <HomePage /> },
  { path: BASE_ROUTE.BROWSE, element: <BrowsePage /> },
  { path: BASE_ROUTE.JOBS, element: <JobsPage /> },
  { path: BASE_ROUTE.DESCRIPTION, element: <DescriptionPage /> },
  { path: BASE_ROUTE.PROFILE, element: <ProfilePage /> },
];
