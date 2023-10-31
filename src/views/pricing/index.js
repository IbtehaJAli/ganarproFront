import React, { useState } from "react";
import PricingCard from "../../components/PricingCard";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import allApps from "../../assets/img/All-Projects-150.jpg";
import calcApp from "../../assets/img/calculator-app-ganarpro-300x300.png";
import preQualify from "../../assets/img/Prequalify-app-ganarpro-300x300.png";
import proposalApp from "../../assets/img/Proposal-template-app-ganarpro-300x300.png";
import projectApp from "../../assets/img/projects-png-ganarpro-fav-300x300.png";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
const StyledAccordion = styled(Accordion)`
  .accordion-button {
    background-color: #fff;
  }
`;
const products = [
  {
    id: 1,
    name: "Ganarpro All Apps",
    amount: "$44.99",
    canceled_amount: "$99.99",
    image: allApps,
    price_id: process.env.REACT_APP_ALL_APPS,
  },
  {
    id: 2,
    name: "Planify",
    amount: "$23.99",
    canceled_amount: "$39.99",
    image: preQualify,
    price_id: process.env.REACT_APP_PREQUAL_APP,
  },
  {
    id: 3,
    name: "Projects",
    amount: "$23.99",
    canceled_amount: "$45.99",
    image: projectApp,
    price_id: process.env.REACT_APP_PROJECT_APP,
  },
  {
    id: 4,
    name: "Cleanup Proposal",
    amount: "$19.99",
    canceled_amount: "$45.99",
    image: proposalApp,
    price_id: process.env.REACT_APP_PROPOSAL_APP,
  },
  {
    id: 5,
    name: "Cleanup Calculator",
    amount: "$23.99",
    canceled_amount: "$19.99",
    image: calcApp,
    price_id: process.env.REACT_APP_CALC_APP,
  },
];
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PricingPage = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const { user: profile } = useSelector((state) => state.userDetails);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="container p-5">
        <div className="row ">
          <h1 className="my-2">Plans and pricing for Ganarpro Cloud Apps</h1>
          <h3 className="mb-md-5">
            <a
              href="https://www.ganarpro.com/compare-plans/"
              target="_blank"
              rel="noreferrer"
            >
              see product features
            </a>
          </h3>

          {products.map((product) => {
            return (
              <Elements key={product.id} stripe={stripePromise}>
                <PricingCard
                  key={product.id}
                  num={product.id}
                  product={product}
                  profile={profile}
                />
                ;
              </Elements>
            );
          })}
        </div>
        <Row className="justify-content-">
          <h2 className="text-start mt-5 fw-bolder">
            Exclusive business features
          </h2>
          <Col md={3} className="text-start mt-5">
            <h5 className="fw-bolder"> Instant access, no downloads</h5>
            <p>
              Ganarpo is a web based application, you can use all tools from
              your desktop and mobile device instantly, and at all times.
            </p>
          </Col>
          <Col md={3} className="text-start mt-5">
            <h5 className="fw-bolder">Affordable and simple pricing</h5>
            <p>
              Subscribe to all apps or subscribe to each product individually.
              Use the apps that your business needs most to succeed in the
              construction industry.
            </p>
          </Col>
          <Col md={3} className="text-start mt-5">
            <h5 className="fw-bolder">Find active construction projects</h5>
            <p>
              Use the map to locate commercial construction projects. View
              project details with decision maker contact information.
            </p>
          </Col>
          <Col md={3} className="text-start mt-5">
            <h5 className="fw-bolder">Calculate winning prices</h5>
            <p>
              Enter building square footage to estimate a bid amount. Easily
              adjust the estimated price and save your estimate for further
              configuration.
            </p>
          </Col>
          <Col md={3} className="text-start mt-5">
            <h5 className="fw-bolder">Generate proposals</h5>
            <p>
              Use our scope of work templates and merge your company details
              into proposals for quick generation.
            </p>
          </Col>
          <Col md={3} className="text-start mt-5">
            <h5 className="fw-bolder">Find customers</h5>
            <p>
              Access 1,000+ blank prequalification applications to fill in and
              submit to start receiving invitation to bid requests directly to
              your email inbox.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-"></Row>
      </div>
    </div>
  );
};

export default PricingPage;
