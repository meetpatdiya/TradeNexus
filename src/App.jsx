import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AppProvider from "./AppProvider";
import Login from "./assets/CommonLandingPages/Login";
import CoinDetails from "./assets/UserSide/CoinDetails";
import Home from "./assets/CommonLandingPages/Home";
import Watchlist from "./assets/UserSide/Watchlist";
import Portfolio from "./assets/UserSide/Portfolio";
import Market from "./assets/UserSide/Market";
import Feedback from "./assets/UserSide/Feedback";
import Registration from "./assets/CommonLandingPages/Registration";
import UserDashboard from "./assets/UserSide/UserDashboard";
import InvestorDashboard from "./assets/InvestorSide/InvestorDashboard";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/userdashboard",
      element: <UserDashboard />, 
      children: [
        { path: "portfolio", element: <Portfolio /> },
        { path: "watchlist", element: <Watchlist /> },
        { path: "market", element: <Market /> },
        { path: "feedback", element: <Feedback /> },
      ],
    },
    {
      path: "/investordashboard",
      element: <InvestorDashboard />,
    },
    {
      path: "/coin/:id",
      element: <CoinDetails />,
    },
    // {
    //   path: "/",
    //   element: <Navigate to="/coin/bitcoin"/>,
    // },
    // {
    //   path: "/watchlist",
    //   element: <Watchlist />,
    // },
    // {
    //   path: "/portfolio",
    //   element: <Portfolio />,
    // },
    // {
    //   path: "/market",
    //   element: <Market />,
    // },
    // {
    //   path: "/feedback",
    //   element: <Feedback />,
    // },
    {
      path: "/register/:role",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </>
  );
};

export default App;
