import dotenv from "dotenv";
dotenv.config();
import { uploadToCloudinary } from "../utils/cloudinary/cloudinary.js";
import { DBConnection } from "../lib/DBConnection.js";
import { ObjectId } from "mongodb";
dotenv.config();
export async function AddProperty(req, res) {
  try {
    const client = await DBConnection();
    const {
      title,
      location,
      image,
      propertyImage,
      priceRangeMin,
      priceRangeMax,
      name,
      email,
    } = await req.body;
    const flag = "property";
    const responseImageUpload = await uploadToCloudinary(propertyImage, flag);
    if (responseImageUpload?.asset_id) {
      const propertiseData = {
        name: name,
        email: email,
        title: title,
        location: location,
        propertyImage: responseImageUpload?.secure_url,
        priceRangeMax: priceRangeMax,
        priceRangeMin: priceRangeMin,
        image: image,
        reviews: [],
        imagePublicId: responseImageUpload?.public_id,
        role: "agent",
        isVerified: false,
        isRejected: false,
        status: "pending",
        isAdmin: false,
        isAgent: true,
        isUser: false,
        recentDate: new Date().toLocaleDateString(),
        timeStamp: Date.now(),
      };
      await client
        .db("Agent_propertises")
        .collection("propertise")
        .insertOne(propertiseData);
      return res.status(200).json({
        message: "Property Uploaded",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Property not Uploaded",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}

export async function AgentAddedPropertise(req, res) {
  try {
    const client = await DBConnection();
    const agentPropertises = await client
      .db("Agent_propertises")
      .collection("propertise")
      .find()
      .sort({ timeStamp: -1 })
      .toArray();
    return res.status(200).json({
      message: "Propertises found",
      success: true,
      agentPropertises,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}

export async function RequestedPropertise(req, res) {
  try {
    const client = await DBConnection();
    const requestedPropertise = await client
      .db("WhishlistDB")
      .collection("whishlists")
      .find()
      .toArray();
    return res.status(200).json({
      message: "All Requested propertises",
      success: true,
      requestedPropertise,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}
export async function DoAccepteOrRejectedPropertise(req, res) {
  try {
    const { id, flag } = await req.body;
    const filter = {
      _id: new ObjectId(id),
    };
    const doc = {
      $set: {
        offerStatus: flag,
      },
    };
    const options = {
      upsert: true,
    };

    const client = await DBConnection();
    const acceptedPropertise = await client
      .db("WhishlistDB")
      .collection("whishlists")
      .findOneAndUpdate(filter, doc, options);

    if (acceptedPropertise) {
      return res.status(200).json({
        message: `${flag} propertise`,
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Not Accepted propertise",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}

export async function DeletedPropertise(req, res) {
  try {
    const { id } = await req.params;
    const client = await DBConnection();
    const propertiseId = new ObjectId(id);
    const response = await client
      .db("Agent_propertises")
      .collection("propertise")
      .findOneAndDelete({ _id: propertiseId });
    if (response !== null) {
      return res.status(200).json({
        message: "Deleted successfully",
        success: true,
      });
    }
    return res.status(200).json({
      message: "Deleted not successfully",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}
