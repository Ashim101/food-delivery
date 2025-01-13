import multer from "multer";
import express from "express";
import { createMyRestraurant } from "../controllers/MyRestraurantController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyRestaurantRequest } from "../middlewares/validation";

const myRestraurantRoutes = express.Router()

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,

    }
})

myRestraurantRoutes.post("/", upload.single("image"), validateMyRestaurantRequest, jwtCheck, jwtParse, createMyRestraurant)


export default myRestraurantRoutes;

