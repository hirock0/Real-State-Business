import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function StripePaymentIntent(req, res) {
  try {
    const { price } = req.body;
    const offerPrice = parseInt(price);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: offerPrice * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });
    return res.status(200).json({
      message: `${offerPrice}tk will be deducted`,
      success: true,
      clientScret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
