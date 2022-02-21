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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mx-4 sm:mx-16 p-6 sm:p-8 border-2 rounded-xl shadow-md">
        <div className="col-span-2">
          <div className="mb-4">
            <h3>Dirección de envío</h3>
            <p>
              {cart.shippingAddress.address} - {cart.shippingAddress.postalCode}
              , {cart.shippingAddress.city} - {cart.shippingAddress.country}
            </p>
          </div>
          <div className="mb-4">
            <h3>Método de Pago</h3>
            <p>{cart.paymentMethod}</p>
          </div>
          <div>
            <h3>Lista de Productos</h3>
            <div>
              {cart.cartItems.length === 0 ? (
                <Message>Tu carrito esta vacío</Message>
              ) : (
                <>
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="mt-4">
                      <div className="flex place-items-center">
                        <img
                          className="w-[150px] rounded-xl"
                          src={item.image}
                          alt=""
                        />
                        <div className="w-full p-4">
                          <Link
                            className="link link-secondary"
                            to={`/product/${item.product}`}
                          >
                            {item.title}
                          </Link>
                          <div className="mt-2">
                            {item.qty} x {item.price} PEN →{" "}
                            {(item.qty * item.price).toFixed(2)} PEN
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

        <div className="col-span-2 md:col-span-1">
          <h2 className="mb-8 text-center uppercase">Resumen del pedido</h2>
          <div className="flex justify-between">
            <span className="mb-2">Subtotal:</span>
            <p>{cart.itemsPrice} PEN</p>
          </div>
          <div className="flex justify-between">
            <span className="mb-2">Precio de envío:</span>
            <p>{cart.shippingPrice} PEN</p>
          </div>
          <div className="flex justify-between">
            <span className="mb-2">IGV:</span>
            <p>{cart.taxPrice} PEN</p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="mb-2">Total:</span>
            <p>{cart.totalPrice} PEN</p>
          </div>

          <div className="text-red-600">
            {error && <Message>{error}</Message>}
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary btn-block mt-2"
              disabled={cart.cartItems === 0}
              onClick={placeOrder}
            >
              Realizar Pedido
            </button>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}
