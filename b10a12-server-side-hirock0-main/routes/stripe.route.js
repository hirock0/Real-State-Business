import express from "express";
import { StripePaymentIntent } from "../controllers/stripe.controller.js";

export const stripeRoutes = express.Router();
stripeRoutes.post("/payment_intents",StripePaymentIntent)