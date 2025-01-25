import dotenv from "dotenv";
dotenv.config();
import { DBConnection } from "../lib/DBConnection.js";
import { ObjectId } from "mongodb";
export async function ManagePropertises(req, res) {
  try {
    const client = await DBConnection();
    const pendingPropertise = await client
      .db("Agent_propertises")
      .collection("propertise")
      .find()
      .sort({ timeStamp: -1 })
      .toArray();

    return res.status(200).json({
      message: "Pending data found",
      success: true,
      pendingPropertise,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}

export async function VerifyPropertise(req, res) {
  try {
    const { id } = await req.params;
    const filter = {
      _id: new ObjectId(id),
    };
    const options = {
      upsert: true,
    };
    const doc = {
      $set: {
        isVerified: true,
        status: "verified",
      },
    };
    const client = await DBConnection();
    const verified = await client
      .db("Agent_propertises")
      .collection("propertise")
      .updateOne(filter, doc, options);
    if (verified?.matchedCount > 0) {
      return res.status(200).json({
        message: "Propertise verifed",
        success: true,
      });
    }

    return res.status(200).json({
      message: "Propertise not verifed",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: true,
    });
  }
}
export async function RejectPropertise(req, res) {
  try {
    const { id } = await req.params;
    const filter = {
      _id: new ObjectId(id),
    };
    const options = {
      upsert: true,
    };
    const doc = {
      $set: {
        isRejected: true,
        status: "rejected",
      },
    };
    const client = await DBConnection();
    const rejected = await client
      .db("Agent_propertises")
      .collection("propertise")
      .updateOne(filter, doc, options);
    if (rejected?.matchedCount > 0) {
      return res.status(200).json({
        message: "Propertise Rejected",
        success: true,
      });
    }

    return res.status(200).json({
      message: "Propertise not rejected",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}

export async function ConvertAgent(req, res) {
  try {
    const client = await DBConnection();
    const { id } = await req.params;
    const filter = {
      _id: new ObjectId(id),
    };
    const options = {
      upsert: true,
    };
    const doc = {
      $set: {
        isAgent: true,
        role: "agent",
        isUser: false,
        isAdmin: false,
      },
    };

    const converted = await client
      .db("LoggedUser")
      .collection("users")
      .updateOne(filter, doc, options);

    if (converted?.matchedCount > 0) {
      return res.status(200).json({
        message: "Converted to Agent",
        success: true,
      });
    }

    return res.status(200).json({
      message: "Not Converted to Agent",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not Converted to Agent",
      success: false,
    });
  }
}
export async function ConvertAdmin(req, res) {
  try {
    const { id } = await req.params;
    const client = await DBConnection();
    const filter = {
      _id: new ObjectId(id),
    };
    const options = {
      upsert: true,
    };
    const doc = {
      $set: {
        isAgent: false,
        role: "admin",
        isUser: false,
        isAdmin: true,
      },
    };

    const converted = await client
      .db("LoggedUser")
      .collection("users")
      .updateOne(filter, doc, options);

    if (converted?.matchedCount > 0) {
      return res.status(200).json({
        message: "Converted to Admin",
        success: true,
      });
    }

    return res.status(200).json({
      message: "Not Converted to Admin",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not Converted to Admin",
      success: false,
    });
  }
}
export async function ConvertFraud(req, res) {
  try {
    const { id } = await req.params;
    const client = await DBConnection();
    const filter = {
      _id: new ObjectId(id),
    };
    const options = {
      upsert: true,
    };
    const doc = {
      $set: {
        isAgent: false,
        role: "fraud",
        isUser: false,
        isAdmin: false,
      },
    };

    const converted = await client
      .db("LoggedUser")
      .collection("users")
      .updateOne(filter, doc, options);

    if (converted?.matchedCount > 0) {
      return res.status(200).json({
        message: "Converted to Fraud",
        success: true,
      });
    }

    return res.status(200).json({
      message: "Not Converted to Fraud",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not Converted to Fraud",
      success: false,
    });
  }
}

export async function Deleteuser(req, res) {
  try {
    const { id } = await req.params;
    const filter = {
      _id: new ObjectId(id),
    };
    const client = await DBConnection();
    const userDeleted = await client
      .db("LoggedUser")
      .collection("users")
      .deleteOne(filter);

    if (userDeleted?.deletedCount > 0) {
      return res.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "User not deleted",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "User not deleted",
      success: false,
    });
  }
}
