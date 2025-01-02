import { Navigate, Outlet } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import { ModalProvider } from "../contexts/ModalContext";
import { useUser } from "../hooks/useUser";

const AdminRoute = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== "ROLE_ADMIN") {
    return <Navigate to="/err" />;
  }

  return (
    <AdminLayout>
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </AdminLayout>
  );
};

export default AdminRoute;
