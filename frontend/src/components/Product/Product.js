import React from "react";
import { Rating } from "../../components";
import "./Product.scss";

export function Product({ product }) {
  return (
    <div className="card group">
      <div className="card__figure">
        <img src={product.image} alt={product.id} />
      </div>
      <div className="card__container">
        <h3>{product.title}</h3>
        <Rating
          value={product.rating}
          text={`de ${product.num_reviews} reseñas`}
          color={"#f6e05e"}
        />
        <div>
          <p>S/. {product.price}</p>
          <p className="line-through">S/. {(product.price * 1.1).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
