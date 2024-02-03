import express from "express";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import validateBody from "../helpers/validateBody.js";
import { register } from "../controllers/authControllers.js";

import { isValidId } from "../middlewares/isValidId.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema));
// authRouter.get("/current", authenticate, getCurrent);
// authRouter.post("/logout", authenticate, logout);

export default authRouter;
