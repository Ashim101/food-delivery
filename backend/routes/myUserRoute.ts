import express from "express";
import { createCurrentUser, getUserProfileData, updateUserProfile } from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";

const userRoutes = express.Router();

// Post route for creating a user
userRoutes.post("/", jwtCheck, createCurrentUser);
userRoutes.put("/", jwtCheck, jwtParse, validateMyUserRequest, updateUserProfile);
userRoutes.get("/", jwtCheck, jwtParse, getUserProfileData);


export default userRoutes;
