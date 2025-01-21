import express from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession, stripeWebhookHandler } from "../controllers/OrderController";

const orderRoutes=express.Router()

orderRoutes.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession)
orderRoutes.post("/checkout/webhook", stripeWebhookHandler);

export default orderRoutes