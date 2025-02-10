import request from "supertest";
import app from "../../app";
import { ApiSuccessMessages } from "../../constants";
import { createJobService } from "../../services/job.services";

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

jest.mock("../../services/job.services.ts");

describe("Create Job Controller", () => {
  it("should return 400 if validation fails (title is missing)", async () => {
    const mockJobWithouttitle = {
      location: "india",
      description: "full stack developer",
      salary: 222,
      experienceLevel: 2,
      jobType: "full time",
      position: 5,
      createdBy: "1011010",
      companyId: "200000",
    };
    const response = await request(app).post(`/api/v1/job/create-job`).send(mockJobWithouttitle);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation Failed");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Required",
          field: "title",
        }),
      ])
    );
  });
  it("should return 400 if validation fails (title is missing)", async () => {
    const mockJobWithtitle = {
      location: "india",
      title: "full stack",
      description: "full stack developer",
      salary: 222,
      experienceLevel: 2,
      jobType: "full time",
      position: 5,
      createdBy: "1011010",
      companyId: "200000",
    };
    (createJobService as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).post(`/api/v1/job/create-job`).send(mockJobWithtitle);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe(ApiSuccessMessages.JOB_CREATED);
    expect(response.body.success).toBeTruthy();
  });
});
