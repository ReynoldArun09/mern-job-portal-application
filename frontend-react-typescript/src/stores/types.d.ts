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

export type ApplicationType = {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  applicant: string;
};

export type RoleType = "student" | "recruiter";
export type StatusType = "pending" | "accepted" | "rejected";

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

export type CompanyType = {
  _id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  logo?: string;
};

export type ApplicantType = {
  _id: string;
  job: JobType;
  applicant: {
    _id: string;
    email: string;
    fullname: string;
    phoneNumber: string;
    profile: {
      bio: string;
      skills: [];
      resume: string;
    };
    role: string;
    updatedAt: string;
  };
  status: StatusType;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCompanyApiResponse = CompanyType;

export type CreateCompanyApiResponse = {
  data: CompanyType;
  message: string;
  success: boolean;
};

export type CreateJobApiResponse = {
  data: JobType;
  message: string;
  success: boolean;
};
