import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ParsedEnvVariables } from "../configs";
import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { User } from "../models";
import { AppError } from "../utils";
import { SignInSchemaType, SignUpSchemaType } from "../validations";

export const signUpUserService = async (body: SignUpSchemaType) => {
  const { fullname, email, phoneNumber, password, role, photo } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(ApiErrorMessages.USER_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
  }
  const salt = parseInt(ParsedEnvVariables.SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
    profile: {
      profilePhoto: photo,
    },
  });
};

export const signInUserService = async (body: SignInSchemaType) => {
  const { email, password, role } = body;

  const existingUser = await User.findOne({ email, role });
  if (!existingUser) {
    throw new AppError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    throw new AppError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const userData = {
    _id: existingUser._id,
    fullname: existingUser.fullname,
    email: existingUser.email,
    phoneNumber: existingUser.phoneNumber,
    role: existingUser.role,
    profile: existingUser.profile,
  };

  const token = await jwt.sign({ _id: existingUser._id }, ParsedEnvVariables.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { user: userData, token };
};
