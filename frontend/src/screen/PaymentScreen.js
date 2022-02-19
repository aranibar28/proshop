import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer, CheckoutSteps } from "../components";
import { savePaymentMethod } from "../actions/cartActions";

export function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <form onSubmit={submitHandler}>
        <div className="mb-2">
          <h2 className="block text-md mb-2">Seleccionar Método</h2>
          <label>
            <input
              type="radio"
              id="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            PayPal or Credit Card
          </label>
        </div>
        <button type="submit" className="btn btn-success">
          Continuar
        </button>
      </form>
    </FormContainer>
  );
}
