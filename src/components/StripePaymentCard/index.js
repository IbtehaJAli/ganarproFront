import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../StripePaymentCard/StripePaymentCard.css";
import { createSubscription } from "../../store/actions/proposals/proposals.actions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const useOptions = () => {
  return {
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#87BBFD",
        },
      },
      invalid: {
        iconColor: "#eb1c26",
        color: "#eb1c26",
      },
    },
  };
};

const StripePaymentCard = ({ name, setLoginModalShow }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.proposalSubscription);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  // const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    if (!user) {
      setLoginModalShow(true);
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (payload.error) {
      setError(payload.error);
    } else {
      dispatch(
        createSubscription({
          payment_method: payload.paymentMethod.id,
          price_id: process.env.REACT_APP_STRIPE_PRICE_ID,
          ...user,
        })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Card details</label>
      {error && <Alert variant="danger">{error.message}</Alert>}

      <CardElement
        options={options}
        onChange={(e) => {
          setError(e.error);
          // setCardComplete(e.complete);
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="stripe-button"
      >
        {loading ? "processing..." : "Pay"}
      </button>
    </form>
  );
};

export default StripePaymentCard;
