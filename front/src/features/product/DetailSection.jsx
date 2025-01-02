import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

function DetailSection({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-lg-7 h-auto mb-30">
      <div className="h-100 bg-light p-30">
        <h3 className="text-3xl">{product?.title}</h3>
        <div className="d-flex mb-3">
          <div className="text-primary mr-2">
            <small className="fas fa-star" />
            <small className="fas fa-star" />
            <small className="fas fa-star" />
            <small className="fas fa-star-half-alt" />
            <small className="far fa-star" />
          </div>
          <small className="pt-1">(99 Reviews)</small>
        </div>
        <h3 className="font-weight-semi-bold mb-4">{product?.price} DT</h3>
        <p className="mb-4">{product?.description}</p>
        <div className="d-flex align-items-center mb-4 pt-2">
          <button
            onClick={() => addToCart(product._id)}
            className="btn btn-primary px-3">
            <i className="fa fa-shopping-cart mr-1" /> Add To Cart
          </button>
        </div>
        <div className="d-flex mb-3">
          <strong className="text-dark mr-3">Catégories :</strong>
          {product?.category.name}
        </div>

        <div className="d-flex mb-3">
          <strong className="text-dark mr-3">Subcategories :</strong>
          {product?.subcategories.map((sub) => (
            <span key={sub.name}>{sub.name}</span>
          ))}
        </div>

        <div className="d-flex pt-2">
          <strong className="text-dark mr-2">Share on:</strong>
          <div className="d-inline-flex">
            <a className="text-dark px-2">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="text-dark px-2">
              <i className="fab fa-twitter" />
            </a>
            <a className="text-dark px-2">
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="text-dark px-2">
              <i className="fab fa-pinterest" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSection;
