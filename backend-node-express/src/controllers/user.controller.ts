import { type Request, type Response } from "express";
import { HttpStatusCode } from "../constants";
import { AsyncWrapper, SendApiResponse } from "../utils";

/**
 * Controller function to handle user verification requests.
 * This function retrieves authenticated user from the the request context
 * and send a response with the user data
 *
 * @param req - The request object which contains the authenticated user in its context.
 * @param res - The response object used to send the API response.
 * @returns A success response containing the authenticated user data.
 */
export const verifyUserController = AsyncWrapper(async (req: Request, res: Response) => {
  const user = req.ctx;

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: user,
  });
});
