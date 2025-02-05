import mongoose from "mongoose";

export type Role = "student" | "recruiter";

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
