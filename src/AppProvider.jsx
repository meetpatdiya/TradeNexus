import React from 'react'
import { CoinsProvider } from "./assets/Components/CoinsContext";
import { WalletProvider } from "./assets/Components/WalletContext";
import {PortfolioProvider} from "./assets/Components/PortfolioContext"
const AppProvider = ({children}) => {
  return (
    <>
        <CoinsProvider>
            <WalletProvider>
              <PortfolioProvider>
                {children}
              </PortfolioProvider>
            </WalletProvider>
        </CoinsProvider>
    </>
  )
}

export default AppProvider
