import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { JobType } from "./types";

type JobState = {
  jobs: JobType[] | null;
  loading: boolean;
  searchQuery: string;
  alljobs: JobType[] | null;
};

type JobActionState = {
  getLatestJobs: () => void;
  setSearchQuery: (query: string) => void;
  getAllJobs: (query?: string) => void;
};

type initialState = JobState & JobActionState;

export const useJobStore = create<initialState>((set) => ({
  jobs: [],
  searchQuery: "",
  loading: false,
  alljobs: [],
  getLatestJobs: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/job/latest-jobs");
      set({ jobs: response.data.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  },
  setSearchQuery: (query: string) => set(() => ({ searchQuery: query })),
  getAllJobs: async (query: string = "") => {
    set({ loading: true });
    try {
      const url = query ? `/job/all-jobs?keyword=${query}` : "/job/all-jobs";
      const response = await axiosInstance.get(url);
      set({ jobs: response.data.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  },
}));
