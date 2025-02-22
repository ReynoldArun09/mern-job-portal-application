import { ApiErrorMessages, HttpStatusCode } from "../constants";
import cloudinary from "../lib/cloudinary";
import { Company } from "../models";
import { AppError } from "../utils";
import { CompanySchemaType, UpdateCompanySchemaType } from "../validations";

export const registerCompanyService = async (body: CompanySchemaType, userId: string) => {
  const { name } = body;

  const existingCompany = await Company.findOne({ name: name });

  if (existingCompany) {
    throw new AppError(ApiErrorMessages.COMPANY_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
  }

  const newCompany = await Company.create({
    name,
    userId,
  });

  return newCompany;
};

export const getCompaniesByCurrentUserService = async (userId: string) => {
  const existingCompanies = await Company.find({ userId });

  if (!existingCompanies) {
    throw new AppError(ApiErrorMessages.COMPANY_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  return { companies: existingCompanies };
};

export const getCompanyByIdService = async (companyId: string) => {
  const existingCompany = await Company.findById(companyId);

  if (!existingCompany) {
    throw new AppError(ApiErrorMessages.COMPANY_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  return { company: existingCompany };
};

export const updateCompanyService = async (companyId: string, body: Partial<UpdateCompanySchemaType>) => {
  console.log(body);
  const { name, description, website, location, logo } = body;
  let existingCompany = await Company.findById(companyId);

  if (!existingCompany) {
    throw new AppError(ApiErrorMessages.COMPANY_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  if (logo) {
    if (existingCompany?.logo) {
      const publicId = existingCompany?.logo?.split("/").pop()?.split(".")[0] as string;
      await cloudinary.uploader.destroy(publicId);
    }
    const uploadedResponse = await cloudinary.uploader.upload(logo);
    existingCompany.logo = uploadedResponse.secure_url;
  }

  existingCompany.name = name || existingCompany.name;
  existingCompany.description = description || existingCompany.description;
  existingCompany.website = website || existingCompany.website;
  existingCompany.location = location || existingCompany.location;

  existingCompany = await existingCompany.save();
  console.log(existingCompany);

  return { company: existingCompany };
};
