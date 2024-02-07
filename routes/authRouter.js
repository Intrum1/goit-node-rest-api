import express from "express";
import {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} from "../schemas/userSchema.js";
import validateBody from "../helpers/validateBody.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);
authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription,
);
export default authRouter;
