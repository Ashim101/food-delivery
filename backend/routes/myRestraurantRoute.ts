import multer from "multer";
import express from "express";
import { createMyRestraurant, getMyRestaurantOrders, getMyRestraurant, updateMyRestraurant, updateOrderStatus } from "../controllers/MyRestraurantController";
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
myRestraurantRoutes.get("/", jwtCheck, jwtParse, getMyRestraurant)
myRestraurantRoutes.put("/", upload.single("image"), validateMyRestaurantRequest, jwtCheck, jwtParse, updateMyRestraurant)
myRestraurantRoutes.get("/order",jwtCheck,jwtParse,getMyRestaurantOrders);
myRestraurantRoutes.patch("/order/:orderId/status",jwtCheck,jwtParse,updateOrderStatus)


export default myRestraurantRoutes;

