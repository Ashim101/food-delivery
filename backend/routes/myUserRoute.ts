import express from "express";
import { createCurrentUser } from "../controllers/myUserController";

const userRoutes = express.Router();

// Post route for creating a user
userRoutes.post("/", createCurrentUser);

export default userRoutes;
