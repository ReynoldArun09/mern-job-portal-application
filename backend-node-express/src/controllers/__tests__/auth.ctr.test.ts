import request from "supertest";
import app from "../../app";
import { ApiErrorMessages, ApiSuccessMessages, HttpStatusCode } from "../../constants";
import { signInUserService, signUpUserService } from "../../services/auth.services";
import { AppError } from "../../utils";

jest.mock("../../services/auth.services.ts");

describe("Signup controller", () => {
  it("should return 400 if validation fails (missing email)", async () => {
    const inValidUser = {
      fullname: "John Doe",
      password: "password123A$",
      phoneNumber: 12344444,
      role: "student",
      photo: "profilePic.jpg",
    };
    const response = await request(app).post("/api/v1/auth/signup").send(inValidUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation Failed");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
        }),
      ])
    );
  });

  it("should return 400 if user already exits", async () => {
    (signUpUserService as jest.Mock).mockRejectedValueOnce(new AppError(ApiErrorMessages.USER_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST));
    const response = await request(app).post("/api/v1/auth/signup").send({
      fullname: "John Doe",
      email: "johndoe@example.com",
      password: "password123A$",
      phoneNumber: "92929292929",
      role: "student",
      photo: "profilePic.jpg",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.USER_ALREADY_EXISTS);
  });

  it("should create a new User Successfully", async () => {
    (signUpUserService as jest.Mock).mockResolvedValue({});
    const response = await request(app).post("/api/v1/auth/signup").send({
      fullname: "John Doe",
      email: "johndoe@example.com",
      password: "password123A$",
      phoneNumber: "1234567890",
      role: "student",
      photo: "profilePic.jpg",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe(ApiSuccessMessages.SIGN_UP_SUCCESS);
  });
});

describe("Signin Controller", () => {
  it("should return 400 if validation fails (missing password)", async () => {
    const inValidUser = {
      email: "johndoe@example.com",
      role: "student",
    };

    const response = await request(app).post("/api/v1/auth/signin").send(inValidUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation Failed");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
        }),
      ])
    );
  });

  it("should return 400 if user doesnt exits", async () => {
    (signInUserService as jest.Mock).mockRejectedValueOnce(new AppError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST));
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "johndoe@example.com",
      password: "password123A$",
      role: "student",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.USER_NOT_FOUND);
  });

  it("should return 400 if password doesnt match", async () => {
    (signInUserService as jest.Mock).mockRejectedValueOnce(new AppError(ApiErrorMessages.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST));
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "johndoe@example.com",
      password: "invalidpasswordA$",
      role: "student",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.USER_NOT_FOUND);
  });

  it("should login user successfully", async () => {
    (signInUserService as jest.Mock).mockResolvedValue({});
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "johndoe@example.com",
      password: "password123A$",
      role: "student",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(ApiSuccessMessages.SIGN_IN_SUCCESS);
  });
});

describe("Signout Controller", () => {
  it("should signout user successfully", async () => {
    const response = await request(app).post("/api/v1/auth/signout");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(ApiSuccessMessages.SIGN_OUT_SUCCESS);
    expect(response.header["access-token"]).toBeUndefined();
  });
});
