import { Router } from "express";
import { verifyUserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares";

const userRoutes = Router();

userRoutes.get("/verify", AuthMiddleware, verifyUserController);

export default userRoutes;
