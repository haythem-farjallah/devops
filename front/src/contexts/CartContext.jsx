import { createContext, useState, useEffect } from "react";
import { useCartUser } from "../hooks/apiHooks/useAuth";
import { addApi, deleteApi, updateApi } from "../api/apiFactory";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const { data, getCartUser, refetch } = useCartUser();

  const addToCart = (id) => {
    const data = { productId: id };
    addApi("/cart/", data, {
      token: true,
      formData: false,
    })
      .then(() => {
        toast.success("added to cart");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
      });
  };

  const updateCart = (changedList) => {
    changedList.map((item) => {
      updateApi(
        "/cart/",
        item.id,
        { quantity: item.quantity },
        {
          token: true,
          formData: false,
        }
      )
        .then(() => {
          refetch();
        })
        .catch((err) => {
          toast.error(err.response.data?.message);
        });
    });
    toast.success("updated");
  };

  const removeFromCart = (id) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === id);

    if (isItemInCart) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    }

    deleteApi("/cart/", id, {
      token: true,
      formData: false,
    })
      .then(() => {
        refetch();
        toast.success("Deleted");
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
      });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getCartUser().then((data) => {
      setCartItems(data.data.cartItems);
    });
  }, [data]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCart,
        // getCartTotal,
      }}>
      {children}
    </CartContext.Provider>
  );
};
