import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { JobType } from "./types";

type JobState = {
  jobs: JobType[] | null;
  loading: boolean;
};

type JobActionState = {
  getLatestJobs: () => void;
};

type initialState = JobState & JobActionState;

export const useJobStore = create<initialState>((set) => ({
  jobs: [],
  loading: false,
  getLatestJobs: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/job/latest-jobs");
      set({ jobs: response.data.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  },
}));
