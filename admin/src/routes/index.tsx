import { redirect } from "react-router-dom";
import AdminDashboard from "../pages/admin/admin-dashboard";
import Categories from "../pages/admin/categories";
import Customers from "../pages/admin/customers";
import Products from "../pages/admin/product-management";
import Settings from "../pages/admin/settings";
import SignInPage from "../pages/auth/sign-in";
import SignUpPage from "../pages/auth/sign-up";
import AdminLayout from "../component/layout/dashboard-layout";

async function authCheck() {
  const accessToken = await localStorage.getItem("authToken");
  if (accessToken) {
    return redirect("/auth/sign-in");
  }
  return null;
}

async function signInCheck() {
  const accessToken = await localStorage.getItem("authToken");
  if (!accessToken) {
    return redirect("/dashboard");
  }
  return true;
}

export const routes = [
  {
    path: "/",
    element: <AdminLayout />,
    loader: authCheck,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products-management",
        element: <Products />,
      },
      {
        path: "order-management",
        element: <Products />,
      },
      {
        path: "category-management",
        element: <Categories />,
      },
      {
        path: "customer-management",
        element: <Customers />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "auth/sign-in",
    element: <SignInPage />,
    loader: signInCheck,
  },
  {
    path: "auth/sign-up",
    element: <SignUpPage />,
  },
];
