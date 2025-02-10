import request from "supertest";
import app from "../../app";
import { ApiErrorMessages, ApiSuccessMessages, HttpStatusCode } from "../../constants";
import { applyJobService } from "../../services/application.services";
import { AppError } from "../../utils";

jest.mock("../../middlewares/auth.middleware.ts", () => ({
  AuthMiddleware: jest.fn((req, res, next) => {
    req.ctx = {
      _id: "mock-user-id",
      email: "testuser@example.com",
      role: "student",
      fullname: "Test User",
      profile: "mock-profile-url",
      phoneNumber: "123-456-7890",
    };
    next();
  }),
}));

jest.mock("../../services/application.services.ts");

describe("Apply Job Controller", () => {
  it("should return 400 if application already exist", async () => {
    const companyId = "122222222";
    (applyJobService as jest.Mock).mockRejectedValueOnce(
      new AppError(ApiErrorMessages.APPLICATION_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST)
    );
    const response = await request(app).post(`/api/v1/application/apply/${companyId}`);
    expect(response.status).toBe(400);
  });

  it("should return 400 if job already exist", async () => {
    const companyId = "122222222";
    (applyJobService as jest.Mock).mockRejectedValueOnce(new AppError(ApiErrorMessages.JOB_NOT_FOUND, HttpStatusCode.BAD_REQUEST));
    const response = await request(app).post(`/api/v1/application/apply/${companyId}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.JOB_NOT_FOUND);
  });
  it("should return 201 if job is created successfully", async () => {
    const companyId = "122222222";
    (applyJobService as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).post(`/api/v1/application/apply/${companyId}`);
    expect(response.status).toBe(201);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe(ApiSuccessMessages.JOB_APPLICATION_CREATED);
  });
});
