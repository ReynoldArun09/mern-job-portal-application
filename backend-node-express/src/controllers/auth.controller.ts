import { type Request, type Response } from "express";
import { ParsedEnvVariables } from "../configs";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import { signInUserService, signUpUserService } from "../services/auth.services";
import { AsyncWrapper, SendApiResponse } from "../utils";
import { SignInSchema, SignUpSchema } from "../validations";

/**
 * Controller function to handle user sign-up requests.
 * This function validates the request body, invokes the signUpUserService
 * to create a new user, and sends a success response.
 *
 * @param req - The request object containing the user data for sign-up.
 * @param res - The response object used to send the API response.
 * @returns A success response with a message when user sign-up is successful.
 */
export const signUpUserController = AsyncWrapper(async (req: Request, res: Response) => {
  const body = SignUpSchema.parse(req.body);

  await signUpUserService(body);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.SIGN_UP_SUCCESS,
  });
});

/**
 * Controller function to handle user sign-in requests.
 * This function validates the request body, invokes the signInUserService
 * to authenticate the user and generate an access token, and sends a success
 * response along with the user data.
 *
 * @param req - The request object containing the user credentials for sign-in.
 * @param res - The response object used to send the API response.
 * @returns A success response with user data and a cookie containing the access token.
 */
export const signInUserController = AsyncWrapper(async (req: Request, res: Response) => {
  const body = SignInSchema.parse(req.body);

  const { user, token } = await signInUserService(body);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: ParsedEnvVariables.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_IN_SUCCESS,
    data: user,
  });
});

/**
 * Controller function to handle user sign-out requests.
 * This function clears the access token cookie and sends a success response.
 *
 * @param req - The request object.
 * @param res - The response object used to send the API response.
 * @returns A success response indicating the user has been signed out.
 */
export const signOutUserController = AsyncWrapper(async (req: Request, res: Response) => {
  res.clearCookie("accessToken");

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_OUT_SUCCESS,
  });
});
