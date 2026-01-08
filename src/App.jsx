import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { CoinsProvider } from "./assets/Components/CoinsContext";
import { WalletProvider } from "./assets/Components/WalletContext";
import MainHomePage from "./assets/Components/MainHomePage";
import CoinDetails from "./assets/Components/CoinDetails";
import Watchlist from "./assets/Components/Watchlist";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainHomePage />,
    },
    {
      path: "/coin/:id",
      element: <CoinDetails />,
    },
    {
      path: "/",
      element: <Navigate to="/coin/bitcoin"/>,
    },
    {
      path: "/watchlist",
      element: <Watchlist />,
    },
  ]);
  return (
    <>
      <CoinsProvider>
        <WalletProvider>
          <RouterProvider router={router} />
        </WalletProvider>
      </CoinsProvider>
    </>
  );
};

export default App;
