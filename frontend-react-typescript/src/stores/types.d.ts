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
