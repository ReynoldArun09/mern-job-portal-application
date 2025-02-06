import mongoose from "mongoose";
import { CompanyDocument } from "./types";

const companySchema = new mongoose.Schema<CompanyDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model<CompanyDocument>("Company", companySchema);
