import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { ApplicantType, CompanyType, JobType } from "./types";

type AdminState = {
  adminJobsData: JobType[] | null;
  adminCompaniesData: CompanyType[] | null;
  applicantsData: ApplicantType[] | null;
  isFetching: boolean;
};

type AdminActionState = {
  GetAdminPostedJobs: () => void;
  GetAdminCompanies: () => void;
  GetApplicantsData: (jobId: string) => void;
};

type initialState = AdminState & AdminActionState;

export const useAdminStore = create<initialState>((set) => ({
  adminJobsData: [],
  adminCompaniesData: [],
  applicantsData: [],
  isFetching: false,
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
