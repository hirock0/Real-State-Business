import express from "express";
import {
  AddBuyingHistory,
  AuthUser,
  DeleteReviews,
  GetBuyingHistory,
  GoogleAuth,
  Login,
  Register,
  UserReviews,
} from "../controllers/user.controller.js";
import { middleware } from "../middleware/middleware.js";
import { AddReviews } from "../controllers/propertise/verifiedPropertise.controller.js";
export const userRoutes = express.Router();
userRoutes.post("/register", Register);
userRoutes.post("/login", Login);
userRoutes.get("/authUser", middleware, AuthUser);
userRoutes.post("/googleAuth", GoogleAuth);
userRoutes.post("/add_review", AddReviews);
userRoutes.post("/delete_review", DeleteReviews);
userRoutes.get("/get_user_reviews/:email", UserReviews);
userRoutes.get("/get_buying_history", GetBuyingHistory);
userRoutes.post("/add_buying_history", AddBuyingHistory);
