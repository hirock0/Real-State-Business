import express from "express";
import {
  AddProperty,
  AgentAddedPropertise,
  DeletedPropertise,
  DoAccepteOrRejectedPropertise,
  RequestedPropertise,
} from "../controllers/agent.controller.js";
export const agentRoutes = express.Router();
agentRoutes.post("/add_property", AddProperty);
agentRoutes.get("/all_propertises", AgentAddedPropertise);
agentRoutes.get("/delete_propertise/:id", DeletedPropertise);
agentRoutes.get("/requested_propertise", RequestedPropertise);
agentRoutes.post(
  "/accept_or_rejected_propertise",
  DoAccepteOrRejectedPropertise
);
