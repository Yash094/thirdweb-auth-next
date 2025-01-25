"use client";
import type { NextPage } from "next";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../../lib/client";
import { generatePayload, isLoggedIn, login, logout } from "./actions/auth";
import { defineChain, getContract, deploySmartAccount, Hex } from "thirdweb";


const ConnectButtonPage: NextPage = () => {
  const account = useActiveAccount();
  
  return (
    <ConnectButton
      client={client} 
      accountAbstraction={{
        chain: defineChain(37084624),
        sponsorGas: true,
      }}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) => {
          await deploySmartAccount({
            //@ts-ignore
            smartAccount: account,
            accountContract: getContract({
              client,
              address: account?.address as Hex,
              chain: defineChain(37084624),
            }),
            chain: defineChain(37084624),
            client
          })
          return generatePayload({ address, chainId: 37084624 })
        },
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};

export default ConnectButtonPage;
