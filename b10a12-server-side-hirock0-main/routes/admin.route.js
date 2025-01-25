import express from "express";
import {
  ConvertAdmin,
  ConvertAgent,
  ConvertFraud,
  Deleteuser,
  ManagePropertises,
  RejectPropertise,
  VerifyPropertise,
} from "../controllers/admin.controller.js";
import { AllUser } from "../controllers/allUser.controller.js";
export const adminRoutes = express.Router();
adminRoutes.get("/pending_propertises", ManagePropertises);
adminRoutes.get("/all_agents_and_users", AllUser);
adminRoutes.patch("/verify_propertise/:id", VerifyPropertise);
adminRoutes.patch("/reject_propertise/:id", RejectPropertise);
adminRoutes.patch("/convert_admin/:id", ConvertAdmin);
adminRoutes.patch("/convert_agent/:id", ConvertAgent);
adminRoutes.patch("/convert_fraud/:id", ConvertFraud);
adminRoutes.delete("/delete_user/:id", Deleteuser);
