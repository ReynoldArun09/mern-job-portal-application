import { Profile, Role } from "./models/types";

export interface ContextType {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  role: Role;
  phoneNumber: number;
  profile: Profile;
}

declare global {
  namespace Express {
    interface Request {
      ctx: ContextType;
    }
  }
}
