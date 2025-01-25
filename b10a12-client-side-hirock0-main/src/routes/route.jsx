import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/mainLayout/MainLayout";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import AllProperties from "../pages/All_properties/AllProperties";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Property_Details from "../pages/Property_Details/Property_Details";
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import Wishlist from "../pages/Dashboard/UserDashboard/WishList/WishList";
import PropertyBought from "../pages/Dashboard/UserDashboard/PropertyBought/PropertyBought";
import MyReviews from "../pages/Dashboard/UserDashboard/MyReviews/MyReviews";
import DashboardPage from "../pages/Dashboard/page";
import AgentProfile from "../pages/Dashboard/AgentDashboard/AgentProfile/AgentProfile";
import AddProperty from "../pages/Dashboard/AgentDashboard/AddProperty/AddProperty";
import MyAddedProperties from "../pages/Dashboard/AgentDashboard/MyAddedProperties/MyAddedProperties";
import RequestedProperties from "../pages/Dashboard/AgentDashboard/RequestedProperties/RequestedProperties";
import MySoldProperties from "../pages/Dashboard/AgentDashboard/MySoldProperties/MySoldProperties";
import AdminProfile from "../pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile";
import ManageProperties from "../pages/Dashboard/AdminDashboard/ManageProperties/ManageProperties";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ManageReviews from "../pages/Dashboard/AdminDashboard/ManageReviews/ManageReviews";
import axios from "axios";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/all_properties",
          element: (
            <PrivateRoute>
              <AllProperties />
            </PrivateRoute>
          ),
        },

        {
          path: "/property_details/:id",
          element: (
            <PrivateRoute>
              <Property_Details />
            </PrivateRoute>
          ),
          loader: async ({ params }) => {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/propertise/details/${
                params.id
              }`
            );
            return response?.data?.details;
          },
        },
      ],
    },
    // dashboard-routes
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        // user_routes
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/profile",
          element: (
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/wishlist/:id",
          element: (
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          ),
          loader: async ({ params }) => {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/propertise/get_whishlists/${
                params.id
              }`
            );
            return response?.data?.findPropertise;
          },
        },
        {
          path: "/dashboard/bought/:id",
          element: (
            <PrivateRoute>
              <PropertyBought />
            </PrivateRoute>
          ),
          loader: async ({ params }) => {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/propertise/get_whishlists/${
                params.id
              }`
            );
            return response?.data?.findPropertise;
          },
        },
        {
          path: "/dashboard/reviews",
          element: (
            <PrivateRoute>
              <MyReviews />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/payment/:id",
          element: (
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          ),
          loader: async ({ params }) => {
            const response = await axios.get(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/propertise/paymentable_propertise/${params.id}`
            );
            return response?.data?.findPropertise;
          },
        },
        // Agent_routes_start
        {
          path: "/dashboard/agent_profile",
          element: (
            <PrivateRoute>
              <AgentProfile />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/add_property",
          element: (
            <PrivateRoute>
              <AddProperty />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/my_added_property",
          element: (
            <PrivateRoute>
              <MyAddedProperties />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/my_sold_property",
          element: (
            <PrivateRoute>
              <MySoldProperties />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/requested_property",
          element: (
            <PrivateRoute>
              <RequestedProperties />
            </PrivateRoute>
          ),
        },
        // agent_routes_end
        // -------------------------
        // Admin_routes_start
        {
          path: "/dashboard/admin_profile",
          element: (
            <PrivateRoute>
              <AdminProfile />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/manage_propertise",
          element: (
            <PrivateRoute>
              <ManageProperties />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/manage_users",
          element: (
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/manage_reviews",
          element: (
            <PrivateRoute>
              <ManageReviews />
            </PrivateRoute>
          ),
        },
      ],
    },
    // public_routes_start
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
