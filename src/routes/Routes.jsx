import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import UpcomingAppointments from "../pages/dashboard/UpcomingAppointments";
import TestResults from "../pages/dashboard/TestResults";
import SiteBanners from "../pages/dashboard/SiteBanners";
import AllUsers from "../pages/dashboard/AllUsers";
import AddATest from "../pages/dashboard/AddATest";
import Tests from "../pages/Tests";
import AllTests from "../pages/dashboard/AllTests";
import Reservations from "../pages/dashboard/Reservations";
import AddBanner from "../pages/dashboard/AddBanner";
import SingleTest from "../pages/SingleTest";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Testimonials from "../pages/Testimonials";

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
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/testimonials",
        element: <Testimonials></Testimonials>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/all-tests",
        element: <Tests></Tests>,
      },

      {
        path: "/test/:id",
        element: (
          <PrivateRoutes>
            <SingleTest></SingleTest>
          </PrivateRoutes>
        ),
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
        path: "/dashboard/",
        element: (
          <PrivateRoutes>
            <DashboardHome></DashboardHome>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/update-profile",
        element: (
          <UpdateProfile>
            <UpdateProfile></UpdateProfile>
          </UpdateProfile>
        ),
      },
      {
        path: "/dashboard/update-profile",
        element: (
          <PrivateRoutes>
            <UpdateProfile></UpdateProfile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/upcoming-appointments",
        element: (
          <PrivateRoutes>
            <UpcomingAppointments></UpcomingAppointments>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/test-results",
        element: (
          <PrivateRoutes>
            <TestResults></TestResults>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/site-banners",
        element: (
          <PrivateRoutes>
            <SiteBanners></SiteBanners>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/add-banner",
        element: (
          <PrivateRoutes>
            <AddBanner></AddBanner>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <PrivateRoutes>
            <AllUsers></AllUsers>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/add-a-test",
        element: (
          <PrivateRoutes>
            <AddATest></AddATest>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/all-tests",
        element: (
          <PrivateRoutes>
            <AllTests></AllTests>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/reservations",
        element: (
          <PrivateRoutes>
            <Reservations></Reservations>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default routes;
