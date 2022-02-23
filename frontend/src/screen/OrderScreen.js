import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader, Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";

export function OrderScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!order || order.id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]); // eslint-disable-line

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mx-4 sm:mx-16 p-6 sm:p-8 border-2 rounded-xl shadow-md">
        <div className="col-span-2">
          <div className="mb-4">
            <h2 className="mb-8 uppercase">PEDIDO #{order.id}</h2>
            <h3>Nombre</h3>
            <p>
              {order.user.name} - {order.user.email}
            </p>
          </div>
          <div className="mb-4">
            <h3>Dirección de envío</h3>
            <p>
              {order.shippingAddress.address} -{" "}
              {order.shippingAddress.postal_code}, {order.shippingAddress.city}{" "}
              - {order.shippingAddress.country}
            </p>
            {order.is_delivered ? (
              <Message variant="success">
                Delivery el {order.delivered_at}
              </Message>
            ) : (
              <Message variant="warning">No delivery</Message>
            )}
          </div>
          <div className="mb-4">
            <h3>Método de Pago</h3>
            <p>{order.payment_method}</p>
            {order.is_paid ? (
              <Message variant="success">Pagado el {order.paid_at}</Message>
            ) : (
              <Message variant="warning">No Pagado</Message>
            )}
          </div>
          <div>
            <h3>Lista de Productos</h3>
            <div>
              {order.orderItems.length === 0 ? (
                <Message variant="warning">Tu carrito esta vacío</Message>
              ) : (
                <>
                  {order.orderItems.map((item, index) => (
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
                            {item.quantity} x {item.price} PEN →{" "}
                            {(item.quantity * item.price).toFixed(2)} PEN
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
            <p>{order.itemsPrice} PEN</p>
          </div>
          <div className="flex justify-between">
            <span className="mb-2">IGV (18%):</span>
            <p>{order.tax_price} PEN</p>
          </div>
          <div className="flex justify-between">
            <span className="mb-2">Precio de envío:</span>
            {
              (order.shipping_price = "0" ? (
                <p className="text-red-600">ENVÍO GRATIS</p>
              ) : (
                <p>{order.shipping_price}</p>
              ))
            }
          </div>

          <div className="flex justify-between border-t pt-2">
            <span className="mb-2">Total:</span>
            <p>{order.total_price} PEN</p>
          </div>
        </div>
      </div>
    </>
  );
}
