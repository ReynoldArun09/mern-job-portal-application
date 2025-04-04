import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { JobType } from "./types";

type JobState = {
  latestJobsData: JobType[] | null;
  allJobsData: JobType[] | null;
  isFetching: boolean;
  searchQuery: string;
  singleJob: null | JobType;
};

type JobActionState = {
  actions: {
    GetLatestJobs: () => void;
    SetSearchQuery: (searchQuery: string) => void;
    GetAllJobs: (query: string) => void;
    GetSingleJob: (jobId: string) => void;
    ApplyJob: (jobId: string) => void;
  };
};

type initialState = JobState & JobActionState;

export const useJobStore = create<initialState>((set, get) => ({
  latestJobsData: [],
  allJobsData: [],
  isFetching: false,
  searchQuery: "",
  singleJob: null,
  actions: {
    ApplyJob: async (jobId: string) => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.post(`/application/apply/${jobId}`);
        if (response.status === 201) {
          get().actions.GetSingleJob(jobId);
        }
        set({ singleJob: response.data.data, isFetching: false });
      } catch (error) {
        console.log(error);
        set({ isFetching: false });
      }
    },
    SetSearchQuery: (searchQuery: string) => set(() => ({ searchQuery })),
    GetSingleJob: async (jobId: string) => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.get(`/job/single/${jobId}`);
        set({ singleJob: response.data.data.job, isFetching: false });
      } catch (error) {
        console.log(error);
        set({ isFetching: false });
      }
    },
    GetLatestJobs: async () => {
      if (get().latestJobsData?.length !== 0) return;
      set({ isFetching: true });
      try {
        const response = await axiosInstance.get("/job/latest-jobs");
        set({ latestJobsData: response.data.data, isFetching: false });
      } catch (error) {
        console.log(error);
        set({ isFetching: false });
      }
    },
    GetAllJobs: async (query: string = "") => {
      set({ isFetching: true });
      try {
        const url = query ? `/job/all-jobs?keyword=${query}` : "/job/all-jobs";
        const response = await axiosInstance.get(url);
        set({ allJobsData: response.data.data, isFetching: false });
      } catch (error) {
        console.log(error);
        set({ isFetching: false });
      }
    },
  },
}));

export const useJobsActions = () => useJobStore((state) => state.actions);
export const useJobFetching = () => useJobStore((state) => state.isFetching);
export const useLatestJobData = () => useJobStore((state) => state.latestJobsData);
export const useAllJobData = () => useJobStore((state) => state.allJobsData);
export const useSingleJob = () => useJobStore((state) => state.singleJob);
