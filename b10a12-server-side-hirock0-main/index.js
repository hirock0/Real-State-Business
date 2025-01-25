import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.route.js";
import bodyParser from "body-parser";
import { agentRoutes } from "./routes/agent.route.js";
import { adminRoutes } from "./routes/admin.route.js";
import { stripeRoutes } from "./routes/stripe.route.js";
import { propertiseRoutes } from "./routes/propertise/verifiedPropertise.route.js";
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_SIDE_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", stripeRoutes);
app.use("/api/propertise", propertiseRoutes);

app.listen(port, () => {
  // console.log(`Backend is running on port ${port}`);
});
