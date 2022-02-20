import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Message, FormContainer, CheckoutSteps } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

export function OrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const cart = useSelector((state) => state.cart);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.18 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    } else {
      if (!cart.paymentMethod) {
        navigate("/payment");
      }
    }
  }, [success, navigate]); // eslint-disable-line

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-4 sm:mx-16 border-2 p-4">
        <div>
          <div className="mb-8">
            <h2 className="font-bold">Shipping</h2>
            <p>
              {cart.shippingAddress.address} - {cart.shippingAddress.postalCode}
              , {cart.shippingAddress.city} - {cart.shippingAddress.country}
            </p>
          </div>
          <div className="mb-8">
            <h2 className="font-bold">Método de Pago</h2>
            <p>{cart.paymentMethod}</p>
          </div>
          <div className="mb-8">
            <h2 className="font-bold">Lista de Productos</h2>
            <div>
              {cart.cartItems.length === 0 ? (
                <Message>Tu carrito esta vacío</Message>
              ) : (
                <>
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex place-items-center border-2 rounded-md">
                        <img
                          src={item.image}
                          alt=""
                          style={{ width: "150px" }}
                        />
                        <div className="">
                          <Link
                            className="text-indigo-600 hover:underline"
                            to={`/product/${item.product}`}
                          >
                            {item.title}
                          </Link>
                          <div>
                            {item.qty} x S/. {item.price} = S/.{" "}
                            {(item.qty * item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2>Resumen del pedido</h2>
            <div className="flex justify-between">
              <span className="font-bold mr-2">Productos:</span>
              <p>S/. {cart.itemsPrice} </p>
            </div>
            <div className="flex justify-between">
              <span className="font-bold mr-2">Delivery:</span>
              <p>S/. {cart.shippingPrice}</p>
            </div>
            <div className="flex justify-between">
              <span className="font-bold mr-2">I.G.V.:</span>
              <p>S/. {cart.taxPrice} </p>
            </div>
            <div className="flex justify-between">
              <span className="font-bold mr-2">Total:</span>
              <p>S/. {cart.totalPrice} </p>
            </div>

            <div className="text-red-600">
              {error && <Message>{error}</Message>}
            </div>

            <div>
              <button
                type="button"
                className="btn btn-success"
                disabled={cart.cartItems === 0}
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}
