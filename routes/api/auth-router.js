import express from "express";
import authController from "../../controlers/auth-controller";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
} from "../../models/contacts/User.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);
authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;
