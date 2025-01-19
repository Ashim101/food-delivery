import express from "express";
import { param } from "express-validator";
import { getRestaurant, searchRestraurant } from "../controllers/Restraurant";

const restraurantRoutes = express.Router()

restraurantRoutes.get("/search/:city", param("city").isString().trim().notEmpty().withMessage("city parameter must be a valid string"), searchRestraurant)
restraurantRoutes.get("/:restaurantId", param("restaurantId").isString().trim().notEmpty().withMessage("restaurantId parameter must be a valid string"), getRestaurant)

export default restraurantRoutes