import request from "supertest";
import app from "../../app";
import { ApiErrorMessages, ApiSuccessMessages, HttpStatusCode } from "../../constants";
import { getCompaniesByCurrentUserService, getCompanyByIdService, registerCompanyService } from "../../services/company.services";
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

jest.mock("../../services/company.services.ts");

describe("Register Company controller", () => {
  it("should return 400 if validation fails (missing name)", async () => {
    const inValidName = {
      name: "",
    };
    const response = await request(app).post("/api/v1/company/create-company").send(inValidName);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation Failed");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "CompanyName should be more than 4 charc",
        }),
      ])
    );
  });

  it("should return 400 if company already exist", async () => {
    const inValidName = {
      name: "RandomCompany",
    };
    (registerCompanyService as jest.Mock).mockRejectedValueOnce(
      new AppError(ApiErrorMessages.COMPANY_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST)
    );
    const response = await request(app).post("/api/v1/company/create-company").send(inValidName);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.COMPANY_ALREADY_EXISTS);
  });

  it("should return 201 company is created successfully", async () => {
    const inValidName = {
      name: "RandomCompany",
    };
    (registerCompanyService as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).post("/api/v1/company/create-company").send(inValidName);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe(ApiSuccessMessages.COMPANY_CREATED);
  });
});

describe("Get Companies by current user", () => {
  it("should return 400 if companies doesnt exist", async () => {
    (getCompaniesByCurrentUserService as jest.Mock).mockRejectedValueOnce(
      new AppError(ApiErrorMessages.COMPANY_NOT_FOUND, HttpStatusCode.BAD_REQUEST)
    );
    const response = await request(app).get("/api/v1/company/get-company");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.COMPANY_NOT_FOUND);
  });

  it("should return 200 if companies exist", async () => {
    (getCompaniesByCurrentUserService as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).get("/api/v1/company/get-company");
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
  });
});

describe("Get Company By company Id", () => {
  it("should return 400 if company doesnt exist", async () => {
    const mockCompanyId = "2333333311";
    (getCompanyByIdService as jest.Mock).mockRejectedValueOnce(
      new AppError(ApiErrorMessages.COMPANY_NOT_FOUND, HttpStatusCode.BAD_REQUEST)
    );
    const response = await request(app).get(`/api/v1/company/${mockCompanyId}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(ApiErrorMessages.COMPANY_NOT_FOUND);
  });

  it("should return 200 if company exist", async () => {
    const mockCompanyId = "2333333311";
    (getCompanyByIdService as jest.Mock).mockResolvedValueOnce({});
    const response = await request(app).get(`/api/v1/company/${mockCompanyId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
  });
});
