import { Navigate, Outlet } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import { useUser } from "../hooks/useUser";
import { ModalProvider } from "../contexts/ModalContext";
import { CartProvider } from "../contexts/CartContext";

const UserRoute = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== "user") {
    return <Navigate to="/err" />;
  }
  return (
    <CartProvider>
      <UserLayout>
        <ModalProvider>
          <Outlet />
        </ModalProvider>
      </UserLayout>
    </CartProvider>
  );
};

export default UserRoute;
