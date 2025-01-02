import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-tailwind/react";
import "./app.css";
import "./index.css";
import AdminRoute from "./middleware/AdminRoute";
import VesitorRoute from "./middleware/VesitorRoute";
import LoginPage from "./pages/vesitor/LoginPage";
import SubCategoryPage from "./pages/admin/SubCategoryPage";

import AuthProvider from "./contexts/AuthContext";
import Redirect from "./pages/Redirect";
import UserRoute from "./middleware/UserRoute";
import RegisterPage from "./pages/vesitor/RegisterPage";

import ContactPageAdmin from "./pages/admin/ContactPage";
import UsersPage from "./pages/admin/UsersPage";
import HomeAdmin from "./pages/admin/HomeAdmin";
import HomePage from "./pages/vesitor/HomePage";
import IngredientPage from "./pages/admin/IngredientPage";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route path="/" element={<Redirect />} />
              <Route element={<AdminRoute />}>
                <Route path="/admin/ingredients" element={<IngredientPage />} />
                <Route path="/admin/users" element={<UsersPage />} />

                <Route path="/admin/home" element={<HomeAdmin />} />
                <Route path="/admin/messages" element={<ContactPageAdmin />} />
                {/* <Route
                  path="/admin/subCategory"
                  element={<SubCategoryPage />}
                /> */}
              </Route>

              <Route element={<VesitorRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* <Route element={<UserRoute />}>
                <Route path="/home" element={<HomeUserPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route path="/categories" element={<CategoriesPage />} />
                <Route
                  path="/subcategories/:id"
                  element={<SubCategoriesPage />}
                />
                <Route path="/products/:id" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDatail />} />
                <Route path="/profile/:tabs" element={<ProfilPage />} />
                <Route path="/checkout/:id" element={<Checkout />} />
              </Route> */}
            </Routes>
            <Toaster />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>{" "}
    </QueryClientProvider>
  );
}

export default App;
