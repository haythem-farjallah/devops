import React, { useContext, useState } from "react";
import { useGetSpecificData } from "../../hooks/apiHooks/useGetData";
import { CartContext } from "../../contexts/CartContext";

function LineCart({ item, changedList, setChangedList }) {
  const { data: product } = useGetSpecificData("/product/", item?.product);
  const [quantity, setQuantity] = useState(item?.quantity);
  const [changed, setChanged] = useState(false);
  const { removeFromCart } = useContext(CartContext);

  const handelchange = (quantitys) => {
    const isItemInList = changedList.find(
      (cartItem) => cartItem.id === item._id
    );
    if (isItemInList) {
      setChangedList(
        changedList.map((cartItem) =>
          cartItem.id === item._id
            ? { ...cartItem, quantity: quantitys }
            : cartItem
        )
      );
    } else {
      changedList.push({ id: item._id, quantity: quantitys });
      setChangedList(changedList);
    }
  };
  return (
    <tr>
      <td className="align-middle ">
        <img
          src={"http://localhost:8000/products/" + product?.data?.imageCover}
          className="w-10 absolute"
        />
        {product?.data?.title?.slice(0, 16)}
        {product?.data?.title?.length > 16 ? "..." : ""}
      </td>

      <td className="align-middle">
        <div className="input-group quantity mx-auto" style={{ width: 100 }}>
          <div className="input-group-btn">
            <button
              onClick={() => {
                setChanged(true);
                setQuantity((quantity) =>
                  quantity > 0 ? quantity - 1 : quantity
                );
                handelchange(quantity > 0 ? quantity - 1 : quantity);
              }}
              className="btn btn-sm btn-primary btn-minus">
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <p
            type="text"
            className="form-control form-control-sm bg-secondary border-0 text-center">
            {quantity}
          </p>
          <button
            onClick={() => {
              setQuantity((quantity) => quantity + 1);
              setChanged(true);
              handelchange(quantity > 0 ? quantity + 1 : quantity);
            }}
            className="btn btn-sm btn-primary btn-plus">
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </td>

      <td className="align-middle">
        <button
          onClick={() => removeFromCart(item._id)}
          className="btn btn-sm btn-danger">
          <i className="fa fa-times" />
        </button>
        {changed ? (
          <button className="btn btn-sm absolute right-6 hover:text-orange-700">
            changed
          </button>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
}

export default LineCart;
