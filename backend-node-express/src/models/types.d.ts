import mongoose from "mongoose";

export type Role = "student" | "recruiter";
export type ApplicaitonStatus = "pending" | "accepted" | "rejected";

export interface Profile {
  bio: string;
  skills: string;
  resume: string;
  resumeOriginalName: string;
  company: mongoose.Types.ObjectId;
  profilePhoto: string;
}

export interface UserDocument extends Document {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: number;
  role: Role;
  profile: Profile;
}

export interface JobDocument extends Document {
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  company: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  applications: Application[];
}

export interface ApplicationDocument extends Document {
  job: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  status: ApplicaitonStatus;
}

export interface CompanyDocument extends Document {
  name: string;
  location: string;
  description: string;
  logo: string;
  website: string;
  userId: mongoose.Types.ObjectId;
}
