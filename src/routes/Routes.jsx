import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import UpcomingAppointments from "../pages/dashboard/UpcomingAppointments";
import TestResults from "../pages/dashboard/TestResults";
import SiteBanners from "../pages/dashboard/SiteBanners";
import AllUsers from "../pages/dashboard/AllUsers";
import AddATest from "../pages/dashboard/AddATest";
import AllTests from "../pages/dashboard/AllTests";
import Reservations from "../pages/dashboard/Reservations";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/dashboard/update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/dashboard/upcoming-appointments",
        element: <UpcomingAppointments></UpcomingAppointments>,
      },
      {
        path: "/dashboard/test-results",
        element: <TestResults></TestResults>,
      },
      {
        path: "/dashboard/site-banners",
        element: <SiteBanners></SiteBanners>,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/add-a-test",
        element: <AddATest></AddATest>,
      },
      {
        path: "/dashboard/all-tests",
        element: <AllTests></AllTests>,
      },
      {
        path: "/dashboard/reservations",
        element: <Reservations></Reservations>,
      },
    ],
  },
]);

export default routes;
