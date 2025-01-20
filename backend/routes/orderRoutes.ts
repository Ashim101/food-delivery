import express from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession } from "../controllers/OrderController";

const orderRoutes=express.Router()

orderRoutes.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession)
export default orderRoutes