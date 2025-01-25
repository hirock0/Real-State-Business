import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { usePublicAxios } from "../../utils/AxiosInstance/PublicAxiosInstance";
import { useUsers } from "../../utils/TanstackQuery/TanstackQuery";
import swal from "sweetalert";
import Loading from "../../pages/Loading/Loading";
import { useState } from "react";
const CheckoutForm = ({ clientSecret, payAbledata }) => {
  const [paymentBtnFlag, setPaymentBtnFlag] = useState(false);
  const { data: loggedUser, isLoading } = useUsers();
  const axios = usePublicAxios();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentBtnFlag(true);
    try {
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        throw new Error(error);
      } else {
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                name: "Hirock",
                address: paymentMethod.billing_details.address,
              },
            },
          }
        );

        if (error) {
          throw new Error(error);
        } else {
          const history = {
            transactionId: paymentIntent?.id,
            amount: paymentIntent?.amount / 100,
            username: loggedUser?.name,
            userEmail: loggedUser?.email,
            userImage: loggedUser?.image,
            propertyId: payAbledata?.propertyId,
            propertyTitle: payAbledata?.propertyTitle,
            agentEmail: payAbledata?.propertyImage,
            propertyImage: payAbledata?.propertyTitle,
            payment_method: paymentIntent?.payment_method,
            status: paymentIntent?.status,
          };

          const response = await axios.post(
            "/api/user/add_buying_history",
            history
          );
          if (response?.data?.success) {
            swal({
              title: response?.data?.message,
              icon: "success",
            });
            setPaymentBtnFlag(false);
          } else {
            setPaymentBtnFlag(false);
            swal({
              title: response?.data?.message,
              icon: "warning",
            });
          }
        }
      }
    } catch (error) {
      setPaymentBtnFlag(false);
      throw new Error(error);
    }
  };

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" border bg-white p-5 rounded-md shadow-lg"
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  lineHeight: "70px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className=" mt-5">
            <button
              className=" btn w-full"
              type="submit"
              disabled={!stripe || !clientSecret || paymentBtnFlag}
            >
              Pay
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default CheckoutForm;
