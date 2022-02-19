import React from "react";
import { FormContainer, CheckoutSteps } from "../components";

export function OrderScreen() {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h2>OrderScreen</h2>
    </FormContainer>
  );
}
