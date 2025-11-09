"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

export function WalletConnect() {
  const account = useCurrentAccount();

  return (
    <ConnectButton 
      connectText="🔗 Connect Wallet"
      className="!px-4 !py-2 !bg-orange-600 hover:!bg-orange-700 !text-white !rounded !font-bold !transition-colors"
    />
  );
}
