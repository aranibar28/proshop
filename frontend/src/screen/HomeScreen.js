import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product, Loader, Message } from "../components";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";

export function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center pb-8">ÚLTIMOS PRODUCTOS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Product product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
