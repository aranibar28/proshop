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
      <form
        onSubmit={submitHandler}
        className="w-[375px] mx-auto border-2 rounded-xl shadow-md p-6 sm:p-8"
      >
        <div className="mb-2">
          <h2 className="mb-4 uppercase">Seleccionar Método</h2>
          <label className="flex place-items-center mb-4">
            <input
              className="radio radio-primary mr-2"
              id="paypal"
              type="radio"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal or Credit Card
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Continuar
        </button>
      </form>
    </FormContainer>
  );
}
