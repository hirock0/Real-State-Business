import dotenv from "dotenv";
dotenv.config();
import { DBConnection } from "../lib/DBConnection.js";
export async function AllUser(req, res) {
  try {
    const client = await DBConnection();
    const allUser = await client
      .db("LoggedUser")
      .collection("users")
      .find()
      .toArray();

    return res.status(200).json({
      message: "Data found",
      success: true,
      allUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}
