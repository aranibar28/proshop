import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating, Loader, Message } from "../components";
import { listProductDetails } from "../actions/productActions";

export function ProductScreen() {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const history = useNavigate();

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch]); // eslint-disable-line

  const addToCartHandler = () => {
    history(`/cart/${params.id}?qty=${quantity}`);
  };

  const onClickPlus = () => {
    setQuantity((c) => Math.min(c + 1, product.stock));
    if (quantity === product.stock) {
      console.log(`Solo quedan ${product.stock} items de stock`);
    }
  };
  const onClickMinus = () => {
    setQuantity((c) => Math.max(c - 1, 1));
  };

  return (
    <>
      <div className="container mb-6 ml-3">
        <Link to="/" className="font-medium text-blue-500 hover:text-blue-700">
          ← Regresar
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-18 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={product.image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font mb-2 text-gray-500 tracking-widest uppercase">
                  {product.category}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
                <div className="flex my-4">
                  <span className="flex items-center">
                    <Rating
                      value={product.rating}
                      text={`de ${product.num_reviews} reseñas`}
                      color={"#f6e05e"}
                    />
                  </span>
                </div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="mt-4">
                  {product.stock > 0 ? (
                    <div className="inline-flex">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                        onClick={onClickMinus}
                      >
                        -
                      </button>
                      <div className="py-2 px-4">{quantity}</div>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                        onClick={onClickPlus}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <p className="text-red-600">Producto agotado</p>
                  )}
                </div>

                <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div className="flex items-center">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    S/. {product.price}
                  </span>
                  <button
                    className="btn btn-primary ml-auto"
                    disabled={product.stock === 0}
                    onClick={addToCartHandler}
                  >
                    Añadir Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
