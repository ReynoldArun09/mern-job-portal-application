export const AUTH_ROUTES = {
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
};

export const PROTECTED_ROUTES = {
  DASHBOARD: "/admin/dashboard",
  APPLICANTS_LIST: "/admin/jobs/:id/applicants",
  COMPANY_LIST: "/admin/companies",
  JOB_LIST: "/admin/jobs",
  CREATE_COMPANY: "/admin/companies-create",
  CREATE_JOB: "/admin/jobs-create",
  COMPANY_SETUP: "/admin/companies/:id",
};

export const BASE_ROUTE = {
  HOME: "/",
  BROWSE: "/browse",
  DESCRIPTION: "/description/:id",
  JOBS: "/jobs",
  PROFILE: "/profile",
};
