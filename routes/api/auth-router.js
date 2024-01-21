import express from "express";
import authController from "../../controlers/auth-controller.js";
import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
  emailSchema,
} from "../../models/user.js";

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
authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authController.updateSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updAvatar
);
authRouter.get("/verify/:verificationToken", authController.verifyEmail);
authRouter.post(
  "/verify",
  validateBody(emailSchema),
  authController.resendVerifyEmail
);

export default authRouter;
