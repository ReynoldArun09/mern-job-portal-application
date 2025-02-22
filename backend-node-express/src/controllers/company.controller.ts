import { type Request, type Response } from "express";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import {
  getCompaniesByCurrentUserService,
  getCompanyByIdService,
  registerCompanyService,
  updateCompanyService,
} from "../services/company.services";
import { AsyncWrapper, SendApiResponse } from "../utils";
import { CompanyIdSchema, CompanySchema, UpdateCompanySchema } from "../validations";

/**
 * Controller function to handle company registration requests.
 * This function validates the request body, retrieves the authenticated user's ID from the
 * context, invokes the registerCompanyService to create a new company, and send a success request
 * with the created new company data
 *
 * @param req - This request object containing the data to register the new company.
 * @param res - The response object used to send the API response.
 *
 * @return A success response with the newly created company data.
 */
export const registerCompanyController = AsyncWrapper(async (req: Request, res: Response) => {
  const body = CompanySchema.parse(req.body);

  const userId = req.ctx._id;
  const newCompany = await registerCompanyService(body, userId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.COMPANY_CREATED,
    data: newCompany,
  });
});

/**
 * Controller function to retriever the companies associated with the current logged in user.
 * This function retrieves the authenticated user's ID from the context, invokes the getCompaniesByCurrentService to
 * fetch user's companies and send a success response with the list of data
 *
 * @param req - The request object used to retrieve the user's companies
 * @param res - The response object used to send the API response.
 *
 * @returns A success response with the list of companies associated with the current user.
 */
export const getCompaniesByCurrentUserController = AsyncWrapper(async (req: Request, res: Response) => {
  const userId = req.ctx._id;

  const { companies } = await getCompaniesByCurrentUserService(userId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: companies,
  });
});

/**
 * Controller function to retrieve a specific company by its ID.
 * This function validates the company ID from the request parameters,
 * invokes the getCompanyByIdService to fetch the company details,
 * and sends a success response with the company data.
 *
 * @param req - The request object containing the company ID in the parameters.
 * @param res - The response object used to send the API response.
 * @returns A success response with the company data for the given ID.
 */
export const getCompanyByIdController = AsyncWrapper(async (req: Request, res: Response) => {
  const companyId = CompanyIdSchema.parse(req.params.id);

  const { company } = await getCompanyByIdService(companyId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: company,
  });
});

/**
 * Controller function to update a company by its ID.
 * This function validates the company data from the request parameters,
 * invokes the updateCompanyService to update the company details,
 * and sends a success response with the new updated company data.
 *
 * @param req - The request object containing the company data in the body.
 * @param res - The response object used to send the API response.
 * @returns A success response with the new company data.
 */
export const updateCompanyController = AsyncWrapper(async (req: Request, res: Response) => {
  const companyId = CompanyIdSchema.parse(req.params.id);
  const body = UpdateCompanySchema.parse(req.body);
  const { company } = await updateCompanyService(companyId, body);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: company,
  });
});
