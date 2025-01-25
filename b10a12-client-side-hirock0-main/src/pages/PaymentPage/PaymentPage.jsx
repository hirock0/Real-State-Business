import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { usePublicAxios } from "../../utils/AxiosInstance/PublicAxiosInstance";
import swal from "sweetalert";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISABLE_KEY);
const PaymentPage = () => {

  const payAbledata = useLoaderData();
  const axios = usePublicAxios();
  const [clientSecret, setClientSecret] = useState("");

  const onSendTaka = async () => {
    const response = await axios.post("/api/payment/payment_intents", {
      price: payAbledata?.offerValue,
    });
    if (response?.data?.success) {
      swal({
        title: response?.data?.message,
        icon: "success",
      });
      setClientSecret(response?.data?.clientScret);
    } else {
      swal({
        title: response?.data?.message,
        icon: "warning",
      });
      setClientSecret("");
    }
  };

  return (
    <main className=" bg-slate-100 min-h-screen py-10">
      <div className="">
        <div className=" container mx-auto px-5">
          <div className=" ">
            <div className=" ">
              <h1 className=" text-3xl font-serif text-center">
                Payment Confirm
              </h1>
              <div className=" flex items-center justify-center mt-5">
                <button
                  onClick={onSendTaka}
                  className=" tooltip tooltip-top btn btn-neutral"
                  data-tip="confirm your money"
                >
                  Confirm : ${payAbledata?.offerValue}
                </button>
              </div>
            </div>
          </div>
          <div className=" mt-10">
            <Elements stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} payAbledata={payAbledata} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
