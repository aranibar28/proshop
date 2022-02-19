import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../components";
import { addToCart, removeFromCart } from "../actions/cartActions";

export function CartScreen() {
  const params = useParams();
  const location = useLocation();
  const productId = params.id;
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = (id) => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Detalles del Producto
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Cantidad
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Precio
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Total
              </h3>
            </div>
            {cartItems.length === 0 ? (
              <Message variant="info">
                Tu carrito esta vacío <Link to="/">Regresar</Link>
              </Message>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <div
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    key={index}
                  >
                    <div className="flex w-2/5">
                      <div className="w-40">
                        <img className="h-24" src={item.image} alt="" />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <Link to={`/product/${item.product}`}>
                          {item.title}
                        </Link>
                        <span className="text-red-500 text-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <input
                        className="form-control"
                        value={item.qty}
                        type="number"
                        min="1"
                        max={item.stock}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      />
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      S/. {item.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      S/. {(item.price * item.qty).toFixed(2)}
                    </span>
                    <span>
                      <button onClick={() => removeCartHandler(item.product)}>
                        X
                      </button>
                    </span>
                  </div>
                ))}
              </>
            )}
            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continuar Comprando
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Resumen de Pedido
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} PRODUCTOS
              </span>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Código de Promoción
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Aplicar
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total a Pagar</span>
                <span>
                  S/.
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Realizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
