import React from 'react'
import { CoinsProvider } from "./assets/UserSide/CoinsContext";
import { WalletProvider } from "./assets/UserSide/WalletContext";
import {PortfolioProvider} from "./assets/UserSide/PortfolioContext"
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
