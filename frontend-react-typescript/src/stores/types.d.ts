export type RoleType = "student" | "recruiter";

export type UserType = {
  _id: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  role: RoleType;
  profile: Profile;
};

export type Profile = {
  bio: string;
  skills: string;
  resume: string;
  resumeOriginalName: string;
  company: Company;
  profilePhoto: string;
};

export type JobType = {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  company: {
    _id: string;
    name: string;
    userId: string;
  };
  createdBy: string;
  applications: ApplicationType[];
  createdAt: string;
  updatedAt: string;
};
