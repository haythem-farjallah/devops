import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

function CardProduct({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className=" shadow-md p-0">
      <div className="product-item bg-light m-0 p-0 ">
        <div className="product-img position-relative overflow-hidden m-0 p-0">
          <img
            className="img-fluid w-100"
            src={"http://localhost:8000/products/" + product.imageCover}
          />
          <div className="product-action">
            <button
              className="btn btn-outline-dark btn-square"
              onClick={() => addToCart(product._id)}>
              <i className="fa fa-shopping-cart" />
            </button>
            <button className="btn btn-outline-dark btn-square">
              <i className="far fa-heart" />
            </button>

            <Link
              className="btn btn-outline-dark btn-square"
              to={"/product/" + product._id}>
              <i className="fa fa-search" />
            </Link>
          </div>
        </div>
        <Link to={"/product/" + product._id}>
          <div className="text-center py-4">
            <div className="h6 text-decoration-none text-truncate">
              {product?.title?.slice(0, 16)}
              {product?.title?.length > 16 ? "..." : ""}
            </div>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5 className="text-orange-500"> {product.price} DT</h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CardProduct;
