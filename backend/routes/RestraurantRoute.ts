import express from "express";
import { param } from "express-validator";
import { searchRestraurant } from "../controllers/Restraurant";

const restraurantRoutes = express.Router()

restraurantRoutes.get("/search/:city", param("city").isString().trim().notEmpty().withMessage("city parameter must be a valid string"), searchRestraurant)

export default restraurantRoutes