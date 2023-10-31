import React, { useState } from "react";
import "./PricingCard.css";
import LoginModal from "../LoginModal";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "../StripePaymentCard/StripePaymentCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import { createSubscriptionAPI } from "../../utils/requests/proposals";
import { toastError, toastSuccess } from "../../utils/helpers/helper";
import Card from "react-bootstrap/Card";

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

const PricingCard = ({ num, product }) => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const dispatch = useDispatch();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const options = useOptions();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    if (!user) {
      setLoginModalShow(true);
      return;
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
      setLoading(true);
      const data = {
        payment_method: payload.paymentMethod.id,
        price_id: product.price_id,
        ...user,
      };

      createSubscriptionAPI(data)
        .then(async (response) => {
          toastSuccess("Payment is Successful");

          localStorage.setItem("user", JSON.stringify(response));
          // dispatch({
          //   type: SUBSCRIPTION_CREATE_SUCCESS,
          //   payload: response,
          // });
          document.location.href = "/";
        })
        .catch((error) => {
          setLoading(false);
          toastError(`Payment Failed`);
        });
      // dispatch(
      //   createSubscription({
      //     payment_method: payload.paymentMethod.id,
      //     price_id: process.env.REACT_APP_STRIPE_PRICE_ID,
      //     ...user,
      //   })
      // );
      setLoading(true);
    }
  };
  let plans = [];
  if (user) {
    plans = user?.subscriptions?.filter((subscription) => {
      const allAppsPriceId = process.env.REACT_APP_ALL_APPS;
      return (
        (subscription.metadata.price_id === product.price_id &&
          subscription.status === "active") ||
        (subscription.metadata.price_id === allAppsPriceId &&
          subscription.status === "active")
      );
    });
  }
  // const [cardComplete, setCardComplete] = useState(false);
  return (
    <div
      className="col-md-4 card  shadow-lg my-4 mx-5"
      style={{ width: "30rem" }}
    >
      <Card.Img variant="top" src={product.image} />
      <div className="card-body mb-5">
        <h5 className="card-title h2 fw-bolder">{product.name}</h5>
        <span className="h3 fw-bolder">{product.amount}</span>/month
      </div>
      <form onSubmit={handleSubmit}>
        {user && plans.length > 0 ? (
          <h3 className="fw-bolder">Subscribed</h3>
        ) : (
          <>
            <label>Card details</label>
            {error && <Alert variant="danger">{error.message}</Alert>}
            <CardElement
              options={options}
              onChange={(e) => {
                setError(e.error);
                // setCardComplete(e.complete);
              }}
            />
            <Button
              type="submit"
              variant="primary"
              className="p-3 "
              disabled={!stripe || loading}
            >
              {loading ? "processing..." : "Pay"}
            </Button>
          </>
        )}
      </form>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </div>
  );
};

export default PricingCard;
