import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer, CheckoutSteps } from "../components";
import { saveShippingAddress } from "../actions/cartActions";

export function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <form
        onSubmit={submitHandler}
        className="max-w-[720px] mx-4 sm:mx-auto p-6 sm:p-8 border-2 rounded-xl shadow-md"
      >
        <h2 className="mb-4 uppercase">Envío del Pedido</h2>
        <div id="address" className="mb-2">
          <label className="block text-md mb-2">Direccion</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="text"
            placeholder="Ingresar dirección"
            required
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>

        <div id="city" className="mb-2">
          <label className="block text-md mb-2">Ciudad</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="text"
            placeholder="Ingresar ciudad"
            required
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>

        <div id="postalCode" className="mb-2">
          <label className="block text-md mb-2">Código Postal</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="text"
            placeholder="Ingresar código postal"
            required
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>

        <div id="country" className="mb-2">
          <label className="block text-md mb-2">País</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="text"
            placeholder="Ingresar país"
            required
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-2">
          Continuar
        </button>
      </form>
    </FormContainer>
  );
}
