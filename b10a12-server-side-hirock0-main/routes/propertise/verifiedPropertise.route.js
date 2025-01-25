import express from "express";
import {
  AllVerifiedPropertises,
  CreateOffer,
  ForPaymentPropertise,
  GetAllReviews,
  GetWhishlists,
  HomePropertise,
  PropertiDetails,
  RemoveWhishlistPropertise,
  Whishlists,
} from "../../controllers/propertise/verifiedPropertise.controller.js";
export const propertiseRoutes = express.Router();
propertiseRoutes.get("/verified_propertise", AllVerifiedPropertises);
propertiseRoutes.get("/home_page_propertis", HomePropertise);
propertiseRoutes.get("/details/:id", PropertiDetails);
propertiseRoutes.post("/whishlist", Whishlists);
propertiseRoutes.get("/get_whishlists/:id", GetWhishlists);
propertiseRoutes.post("/create_offer", CreateOffer);
propertiseRoutes.get("/paymentable_propertise/:id", ForPaymentPropertise);
propertiseRoutes.delete("/delete_whishlist_propertise/:id", RemoveWhishlistPropertise);
propertiseRoutes.get("/get_all_reviews", GetAllReviews);
