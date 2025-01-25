import dotenv from "dotenv";
dotenv.config();
import { DBConnection } from "../../lib/DBConnection.js";
import { ObjectId } from "mongodb";

export async function AllVerifiedPropertises(req, res) {
  try {
    const client = await DBConnection();
    const verifiedPropertises = await client
      .db("Agent_propertises")
      .collection("propertise")
      .find({ isVerified: true })
      .sort({ timeStamp: -1 })
      .toArray();

    return res.status(200).json({
      message: "All verified propertise",
      success: true,
      verifiedPropertises,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
      verifiedPropertise,
    });
  }
}
export async function HomePropertise(req, res) {
  try {
    const client = await DBConnection();
    const homePropertise = await client
      .db("Agent_propertises")
      .collection("propertise")
      .find({ isVerified: true })
      .limit(4)
      .sort({ timeStamp: -1 })
      .toArray();

    return res.status(200).json({
      message: "All verified propertise",
      success: true,
      homePropertise,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
      homePropertise,
    });
  }
}
export async function PropertiDetails(req, res) {
  try {
    const { id } = await req.params;
    const propertyId = {
      _id: new ObjectId(id),
    };
    const client = await DBConnection();
    const details = await client
      .db("Agent_propertises")
      .collection("propertise")
      .find(propertyId)
      .toArray();
    return res.status(200).json({
      message: "Details here",
      success: true,
      details,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
      details,
    });
  }
}

export async function Whishlists(req, res) {
  try {
    const wishlistData = await req.body;
    wishlistData.timeStamp = Date.now();
    wishlistData.recentDate = new Date().toLocaleDateString();
    const { propertyId } = wishlistData;
    const client = await DBConnection();
    const findExistProperty = await client
      .db("WhishlistDB")
      .collection("whishlists")
      .findOne({ propertyId: propertyId });

    if (findExistProperty === null) {
      const saveWishlist = await client
        .db("WhishlistDB")
        .collection("whishlists")
        .insertOne(wishlistData);
      if (saveWishlist?.insertedId) {
        return res.status(200).json({
          message: "Added to whishliste",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "Data not saved",
          success: false,
        });
      }
    } else {
      return res.status(200).json({
        message: "ALready whislisted property",
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

export async function GetWhishlists(req, res) {
  try {
    const { id } = await req.params;
    const Id = {
      userId: id,
    };
    const client = await DBConnection();
    const findPropertise = await client
      .db("WhishlistDB")
      .collection("whishlists")
      .find(Id)
      .toArray();
    return res.status(200).json({
      message: "User wishlists",
      success: true,
      findPropertise,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
      findPropertise,
    });
  }
}
export async function CreateOffer(req, res) {
  try {
    const { id, offerAmount } = await req.body;

    const filter = {
      _id: new ObjectId(id),
    };
    const doc = {
      $set: {
        offerValue: offerAmount,
      },
    };
    const options = {
      upsert: true,
    };
    const offerPrice = parseInt(offerAmount);

    const client = await DBConnection();
    const findPropertise = await client
      .db("WhishlistDB")
      .collection("whishlists")
      .findOne(filter);
    if (findPropertise === null) {
      return res.status(200).json({
        message: "Data not found",
        success: false,
      });
    } else {
      const maxPrice = parseInt(findPropertise?.priceRangeMax);
      const minPrice = parseInt(findPropertise?.priceRangeMin);
      if (offerPrice < minPrice) {
        return res.status(200).json({
          message: " Offer price is less than default offer value ",
          success: false,
        });
      } else if (offerPrice > maxPrice) {
        return res.status(200).json({
          message: " Offer price is greater than default offer value ",
          success: false,
        });
      } else {
        const findPropertise = await client
          .db("WhishlistDB")
          .collection("whishlists")
          .findOneAndUpdate(filter, doc, options);
        if (findPropertise) {
          return res.status(200).json({
            message: "Offer created",
            success: true,
          });
        } else {
          return res.status(200).json({
            message: "Offer not created",
            success: false,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}

export async function ForPaymentPropertise(req, res) {
  try {
    const { id } = await req.params;
    const filter = {
      _id: new ObjectId(id),
    };

    const client = await DBConnection();
    const findPropertise = await client
      .db("WhishlistDB")
      .collection("whishlists")
      .findOne(filter);
    if (findPropertise) {
      return res.status(200).json({
        message: "Found propertise",
        success: true,
        findPropertise,
      });
    } else {
      return res.status(200).json({
        message: "Property not found",
        success: false,
        findPropertise,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}

export async function RemoveWhishlistPropertise(req, res) {
  try {
    const { id } = req.params;

    const filter = {
      _id: new ObjectId(id),
    };

    const client = await DBConnection();
    const deletePropertise = await client
      .db("WhishlistDB")
      .collection("whishlists")
      .findOneAndDelete(filter);
    if (deletePropertise) {
      return res.status(200).json({
        message: "Whishlist property deleted",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Data not deleted",
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

export async function AddReviews(req, res) {
  try {
    const {
      userId,
      propertyId,
      agentEmail,
      agentName,
      propertyTitle,
      userEmail,
      userImage,
      userName,
      review,
    } = await req.body;
    const dynamicId = new ObjectId();
    const client = await DBConnection();
    const newReview = {
      _id: dynamicId,
      userId: new ObjectId(userId),
      propertyId: new ObjectId(propertyId),
      agentEmail: agentEmail,
      agentName: agentName,
      propertyTitle: propertyTitle,
      userName: userName,
      review: review,
      userImage: userImage,
      userEmail: userEmail,
      timeStamp: Date.now(),
      recentDate: new Date().toLocaleDateString(),
    };

    const filter = {
      _id: new ObjectId(propertyId),
    };
    const doc = {
      $push: {
        reviews: newReview,
      },
    };
    const addReviews = await client
      .db("Agent_propertises")
      .collection("propertise")
      .updateOne(filter, doc);
    if (addReviews?.matchedCount > 0) {
      return res.status(200).json({
        message: "Reviews successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Reviews not successfully",
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
export async function GetAllReviews(req, res) {
  try {
    const client = await DBConnection();
    const getReviews = await client
      .db("Agent_propertises")
      .collection("propertise")
      .aggregate([
        {
          $unwind: "$reviews",
        },
      ])
      .toArray();

    return res.status(200).json({
      message: "reviews found",
      success: true,
      getReviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Data not found",
      success: false,
    });
  }
}
