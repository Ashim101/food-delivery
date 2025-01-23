import express from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession, getMyOrders, stripeWebhookHandler } from "../controllers/OrderController";

const orderRoutes=express.Router()

orderRoutes.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession)
orderRoutes.post("/checkout/webhook", stripeWebhookHandler);
orderRoutes.get("/", jwtCheck, jwtParse, getMyOrders);


export default orderRoutes