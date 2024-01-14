import express from "express";
import authController from "../../controlers/auth-controller.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userRegisterSchema, userLoginSchema } from "../../models/user.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  authController.register
);
authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authController.login
);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
