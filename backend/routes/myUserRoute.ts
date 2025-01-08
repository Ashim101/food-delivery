import express from "express";
import { createCurrentUser, updateUserProfile } from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const userRoutes = express.Router();

// Post route for creating a user
userRoutes.post("/", jwtCheck, createCurrentUser);
userRoutes.put("/", jwtCheck, jwtParse, updateUserProfile);

export default userRoutes;
