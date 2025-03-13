"use client";
import type { NextPage } from "next";
import { ConnectButton } from "thirdweb/react";
import { client } from "../../lib/client";
import { generatePayload, isLoggedIn, login, logout } from "./actions/auth";
import { inAppWallet } from "thirdweb/wallets";


const ConnectButtonPage: NextPage = () => {
  const wallets = [
    inAppWallet({
      auth: {
        options: ['google'],
        mode: 'redirect',
        redirectUrl: 'http://localhost:3000/connect-button'
      },
    }),
  ];
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) => generatePayload({ address, chainId: 17000 }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};

export default ConnectButtonPage;