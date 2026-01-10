import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AppProvider from "./AppProvider";

import MainHomePage from "./assets/Components/MainHomePage";
import CoinDetails from "./assets/Components/CoinDetails";
import Watchlist from "./assets/Components/Watchlist";
import Portfolio from "./assets/Components/Portfolio";
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
    {
      path: "/portfolio",
      element: <Portfolio />,
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
