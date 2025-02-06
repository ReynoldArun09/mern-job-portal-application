import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ParsedEnvVariables } from "../configs";
import { ApiErrorMessages, GlobalErrorMessages, HttpStatusCode } from "../constants";
import { User } from "../models";
import { ContextType } from "../types";
import { AppError } from "../utils";

export const AuthMiddleware: RequestHandler = async (req, res, next): Promise<any> => {
  const accessToken = req.cookies.accessToken;

  try {
    if (!accessToken) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: GlobalErrorMessages.UNAUTHORIZED });
    }
    const decoded = jwt.verify(accessToken, ParsedEnvVariables.ACCESS_TOKEN_SECRET) as ContextType;

    const existingCustomer = await User.findById(decoded._id);

    if (!existingCustomer) {
      throw new AppError(ApiErrorMessages.INVALID_TOKEN, HttpStatusCode.UNAUTHORIZED);
    }

    const userObject = {
      _id: existingCustomer._id,
      email: existingCustomer.email,
      role: existingCustomer.role,
      fullname: existingCustomer.fullname,
      profile: existingCustomer.profile,
      phoneNumber: existingCustomer.phoneNumber,
    };

    req.ctx = userObject;
    next();
  } catch (error) {
    next(error);
  }
};
