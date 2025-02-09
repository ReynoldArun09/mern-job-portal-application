import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { JobSchemaType } from "../validations/job-schema";
import { ApplicantType, CompanyType, JobType } from "./types";

type AdminState = {
  adminJobsData: JobType[] | null;
  adminCompaniesData: CompanyType[] | null;
  applicantsData: ApplicantType[] | null;
  isFetching: boolean;
  singleCompanyData: CompanyType | null;
};

type AdminActionState = {
  GetAdminPostedJobs: () => void;
  GetAdminCompanies: () => void;
  GetApplicantsData: (jobId: string) => void;
  CreateCompany: (name: string) => void;
  FetchCompanyById: (companyId: string) => void;
  CreateJob: (values: JobSchemaType) => void;
};

type initialState = AdminState & AdminActionState;

export const useAdminStore = create<initialState>((set) => ({
  adminJobsData: [],
  adminCompaniesData: [],
  applicantsData: [],
  isFetching: false,
  singleCompanyData: null,
  CreateJob: async (values: JobSchemaType) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.post("/job/create-job", values);
      console.log(response.data);
      set({ isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
  CreateCompany: async (name) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.post("/company/create-company", { name });
      console.log(response.data);
      set({ isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
  FetchCompanyById: async (companyId: string) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get(`/company/${companyId}`);
      set({ singleCompanyData: response.data.data, isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
  GetAdminPostedJobs: async () => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get("/job/admin-jobs");
      set({ adminJobsData: response.data.data, isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
  GetAdminCompanies: async () => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get("/company/get-company");
      set({ adminCompaniesData: response.data.data, isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
  GetApplicantsData: async (jobId: string) => {
    set({ isFetching: true });
    try {
      const response = await axiosInstance.get(`/application/${jobId}/applicants`);
      set({ applicantsData: response.data.data, isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
}));
