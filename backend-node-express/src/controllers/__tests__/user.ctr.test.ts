import request from "supertest";
import app from "../../app";

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

describe("Verify user controller", () => {
  it("should return 200 if user is verified success", async () => {
    const response = await request(app).get("/api/v1/user/verify");
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
  });
});
