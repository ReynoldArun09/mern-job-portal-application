import { Router } from "express";
import { signInUserController, signOutUserController, signUpUserController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", signUpUserController);
authRoutes.post("/signin", signInUserController);
authRoutes.post("/signout", signOutUserController);

export default authRoutes;
