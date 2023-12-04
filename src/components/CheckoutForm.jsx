import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const CheckoutForm = ({ price, testName, testId, appointmentDate }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const AxiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      AxiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [AxiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmationError) {
      console.log("Confirmation Error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const reservation = {
          name: user?.displayName,
          email: user?.email,
          testName,
          testId,
          appointmentDate,
          price,
          transactionId: paymentIntent.id,
          paymentDate: new Date(),
          status: "Pending",
          reportUrl: "",
        };

        const res = await AxiosSecure.post("/reservations", reservation);

        if (res.data?.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment Success!",
            text: "Redirecting to dashboard...",
            showConfirmButton: false,
            timer: 1500,
            iconColor: "#0B8FAC",
            customClass: "font-montserrat",
          });
          navigate("/dashboard/reservations");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#23232E",
              "::placeholder": {
                color: "#7BC1B7",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-8"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
