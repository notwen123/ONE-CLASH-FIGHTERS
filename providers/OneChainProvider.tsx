"use client";

import { SuiClientProvider, WalletProvider, createNetworkConfig } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFullnodeUrl } from "@mysten/sui/client";
import { ONECHAIN_CONFIG } from "@/lib/onechain-config";

// Configure OneChain testnet
const { networkConfig } = createNetworkConfig({
  testnet: { 
    url: ONECHAIN_CONFIG.RPC_URL 
  },
});

const queryClient = new QueryClient();

export function OneChainProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
