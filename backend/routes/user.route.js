import express from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";

const authRouter = express.Router();

// User register and login routes (Add proper handlers)
authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

export default authRouter;
