import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./assets/AdminSide/AdminDashboard"
import AppProvider from "./AppProvider";
import Login from "./assets/CommonLandingPages/Login";
import CoinDetails from "./assets/UserSide/CoinDetails";
import News from "./assets/CommonLandingPages/News"
import Home from "./assets/CommonLandingPages/Home";
import Watchlist from "./assets/UserSide/Watchlist";
import Portfolio from "./assets/UserSide/Portfolio";
import Wallet from "./assets/UserSide/Wallet";
import GetFeedback from "./assets/AdminSide/GetFeedback"
import Feedback from "./assets/UserSide/Feedback";
import Registration from "./assets/CommonLandingPages/Registration";
import UserDashboard from "./assets/UserSide/UserDashboard";
import InvestorDashboard from "./assets/InvestorSide/InvestorDashboard";
import HomePage from "./assets/AdminSide/HomePage";
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
        { path: "wallet", element: <Wallet /> },
        { path: "feedback", element: <Feedback /> },
      ],
    },
    {
      path: "/admindashboard",
      element: <AdminDashboard />,
      children: [
        {
          path: "homepage",
            index: true,
          element: <HomePage />,
        },
        // {
        //   path: "users",
        //   element: <Users />,
        // },
        // {
        //   path: "invester",
        //   element: <Invester />,
        // },
        // {
        //   path: "Wallet",
        //   element: <Wallet />,
        // },
        // {
        //   path: "WalletTransaction",
        //   element: <WalletTransaction />,
        // },
        // {
        //   path: "Trade",
        //   element: <Trade />,
        // },
        {
          path: "Feedback",
          element: <GetFeedback />,
        },
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
    {
      path: "/news",
      element: <News />,
    },
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
