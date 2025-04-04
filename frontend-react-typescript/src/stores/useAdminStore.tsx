import { AxiosError } from "axios";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { CompanySchemaType } from "../validations/company-schema";
import { JobSchemaType } from "../validations/job-schema";
import {
  ApplicantType,
  CompanyType,
  CreateCompanyApiResponse,
  CreateJobApiResponse,
  JobType,
  UpdateCompanyApiResponse,
} from "./types";

type AdminState = {
  adminJobsData: JobType[] | null;
  adminCompaniesData: CompanyType[] | null;
  applicantsData: ApplicantType[] | null;
  isFetching: boolean;
  singleCompanyData: CompanyType | null;
};

type AdminActionState = {
  actions: {
    GetAdminPostedJobs: () => void;
    GetAdminCompanies: () => void;
    GetApplicantsData: (jobId: string) => void;
    CreateCompany: (name: string) => Promise<CreateCompanyApiResponse>;
    FetchCompanyById: (companyId: string) => void;
    CreateJob: (values: JobSchemaType) => Promise<CreateJobApiResponse>;
    UpdateCompany: (id: string, values: CompanySchemaType) => Promise<UpdateCompanyApiResponse>;
  };
};

type initialState = AdminState & AdminActionState;

export const useAdminStore = create<initialState>((set) => ({
  adminJobsData: [],
  adminCompaniesData: [],
  applicantsData: [],
  isFetching: false,
  singleCompanyData: null,
  actions: {
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
        set({ applicantsData: response.data.data.applications, isFetching: false });
      } catch (error) {
        console.log(error);
        set({ isFetching: false });
      }
    },
    UpdateCompany: async (id: string, values: CompanySchemaType): Promise<UpdateCompanyApiResponse> => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.put(`/company/update-company/${id}`, values);
        set({ isFetching: false });
        return response.data.data;
      } catch (error) {
        set({ isFetching: false });
        if (error instanceof AxiosError) {
          return error.response?.data?.message || "Something went wrong while creating company.";
        }
        throw error;
      }
    },
    CreateCompany: async (name: string): Promise<CreateCompanyApiResponse> => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.post("/company/create-company", { name });
        set({ isFetching: false });
        return response.data;
      } catch (error) {
        set({ isFetching: false });
        if (error instanceof AxiosError) {
          return error.response?.data?.message || "Something went wrong while updating company details.";
        }
        throw error;
      }
    },
    CreateJob: async (values: JobSchemaType): Promise<CreateJobApiResponse> => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.post("/job/create-job", values);
        set({ isFetching: false });
        return response.data;
      } catch (error) {
        set({ isFetching: false });
        if (error instanceof AxiosError) {
          return error.response?.data?.message || "Something went wrong while updating company details.";
        }
        throw error;
      }
    },
  },
}));

export const useAdminLoading = () => useAdminStore((state) => state.isFetching);
export const useAdminActions = () => useAdminStore((state) => state.actions);
export const useSingleCompanyData = () => useAdminStore((state) => state.singleCompanyData);
export const useAdminCompaniesData = () => useAdminStore((state) => state.adminCompaniesData);
export const useApplicantsData = () => useAdminStore((state) => state.applicantsData);
export const useAdminJobsData = () => useAdminStore((state) => state.adminJobsData);
