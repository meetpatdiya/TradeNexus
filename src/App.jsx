import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import AdminUsers from "./assets/AdminSide/AdminUsers";
import AdminUserDetail from "./assets/AdminSide/AdminUserDetail";
import AdminInvestor from "./assets/AdminSide/AdminInvestor";
import AdminInvestorDetail from "./assets/AdminSide/AdminInvestorDetail";
import AdminDashboard from "./assets/AdminSide/AdminDashboard";
import AdminRevenue from "./assets/AdminSide/AdminRevenue";
import AdminCryptocurrencies from "./assets/AdminSide/AdminCryptocurrencies";
import AdminCryptoDetail from "./assets/AdminSide/AdminCryptoDetail";
import { WalletProvider } from "./assets/UserSide/WalletContext";
import { PortfolioProvider } from "./assets/UserSide/PortfolioContext";
import AdminTrades from "./assets/AdminSide/AdminTrades";
import Login from "./assets/CommonLandingPages/Login";
import CoinDetails from "./assets/UserSide/CoinDetails";
import News from "./assets/CommonLandingPages/News";
import Home from "./assets/CommonLandingPages/Home";
import Watchlist from "./assets/UserSide/Watchlist";
import Portfolio from "./assets/UserSide/Portfolio";
import Wallet from "./assets/UserSide/Wallet";
import GetFeedback from "./assets/AdminSide/GetFeedback";
import Feedback from "./assets/UserSide/Feedback";
import Registration from "./assets/CommonLandingPages/Registration";
import UserDashboard from "./assets/UserSide/UserDashboard";
import InvestorDashboard from "./assets/InvestorSide/InvestorDashboard";
import HomePage from "./assets/AdminSide/HomePage";
import Anaylytics from "./assets/UserSide/Analytics"
import AdminFiatWallet from "./assets/AdminSide/AdminFiatWallet";
import InvestorCommission from "./assets/InvestorSide/InvestorCommission";
import InvestorTransaction from "./assets/InvestorSide/InvestorTransaction";
import InvestorCoinDetail from "./assets/InvestorSide/InvestorCoinDetail";
import InvestorPortfolio from "./assets/InvestorSide/InvestorPortfolio";
import { CoinsProvider } from "./assets/UserSide/CoinsContext";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/userdashboard",
      element: (
        <WalletProvider>
          <PortfolioProvider>
            <UserDashboard />
          </PortfolioProvider>
        </WalletProvider>
      ),
      children: [
        { path: "portfolio", element: <Portfolio /> },
        { path: "watchlist", element: <Watchlist /> },
        { path: "wallet", element: <Wallet /> },
        { path: "feedback", element: <Feedback /> },
        { path: "analytics", element: <Anaylytics /> },
        {
          path: "coin/:id",
          element: <CoinDetails />,
        },
      ],
    },
    {
      path: "/admindashboard",
      element: (
        <WalletProvider>
          <AdminDashboard />
        </WalletProvider>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "users",
          element: <AdminUsers />,
          children: [
            {
              path: ":id",
              element: <AdminUserDetail />,
            },
          ],
        },
        {
          path: "invester",
          element: <AdminInvestor />,
          children: [
            {
              path: ":id",
              element: <AdminInvestorDetail />,
            },
          ],
        },
        {
          path: "wallet",
          element: <AdminFiatWallet />,
        },
        {
          path: "Trade",
          element: <AdminTrades />,
        },
        {
          path: "Revenue",
          element: <AdminRevenue />,
        },
        {
          path: "Cryptocurrencies",
          element: <AdminCryptocurrencies />,
          children: [
            {
              path: ":id",
              element: <AdminCryptoDetail />,
            },
          ],
        },
        {
          path: "Feedback",
          element: <GetFeedback />,
        },
      ],
    },
    {
      path: "/investordashboard",
      element: (
        <WalletProvider>
          <PortfolioProvider>
            <InvestorDashboard />
          </PortfolioProvider>
        </WalletProvider>
      ),
      children: [
        { path: "portfolio", element: <InvestorPortfolio /> },
        { path: "transactions", element: <InvestorTransaction /> },
        { path: "wallet", element: <Wallet /> },
        { path: "coin/:id", element: <InvestorCoinDetail /> },
        { path: "commission", element: <InvestorCommission /> },
      ],
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
      <CoinsProvider>
        <RouterProvider router={router} />
      </CoinsProvider>
    </>
  );
};

export default App;
