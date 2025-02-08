import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { Company } from "../models";
import { AppError } from "../utils";
import { CompanySchemaType } from "../validations";

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
