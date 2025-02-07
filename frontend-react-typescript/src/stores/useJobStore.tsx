import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { JobType } from "./types";

type JobState = {
  latestJobsData: JobType[] | null;
  allJobsData: JobType[] | null;
  isFetching: boolean;
  searchQuery: string;
};

type JobActionState = {
  GetLatestJobs: () => void;
  SetSearchQuery: (searchQuery: string) => void;
  GetAllJobs: (query: string) => void;
};

type initialState = JobState & JobActionState;

export const useJobStore = create<initialState>((set) => ({
  latestJobsData: [],
  allJobsData: [],
  isFetching: false,
  searchQuery: "",
  SetSearchQuery: (searchQuery: string) => set(() => ({ searchQuery })),
  GetLatestJobs: async () => {
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
}));
