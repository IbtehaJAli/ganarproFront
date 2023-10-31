import styled from "styled-components";
import { Accordion } from "react-bootstrap";

export const StyledAccordionHeader = styled(Accordion.Header)`
  background-color: #fff;
  h2 {
    color: #000;
  }
  button {
    font-size: 14px;
    font-weight: 700 !important;
  }
`;
export const StyledForm = styled.form`
  background: #fff;

  text-align: justify;
  .form-floating > .form-control:focus ~ label,
  .form-floating > .form-control:not(:placeholder-shown) ~ label,
  .form-floating > .form-select ~ label {
    opacity: 0.65 !important;
    transform: scale(0.85) translateY(-2rem) translateX(0.15rem) !important;
    background: #fff;
    color: #000;
    font-weight: 700;
    font-size: 1.2em;
  }
  input[type="number"],
  input[type="text"],
  select {
    font-size: 1.2em;
    height: calc(4.5rem + 2px) !important;
    background: #fff;
    select &:focus {
      background: #fff;
    }
  }
  // .form-check-input[type="checkbox"] {
  //   height: 0 !important;
  // }
  div.form-check label {
    margin-top: 0px;
    color: #000;
  }
`;
