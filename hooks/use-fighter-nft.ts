"use client";

import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { ONECHAIN_CONFIG } from "@/lib/onechain-config";
import { useState } from "react";

export function useFighterNFT() {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const [isLoading, setIsLoading] = useState(false);

  // Mint a new fighter NFT
  const mintFighter = async (
    name: string,
    fighterType: number,
    power: number,
    speed: number,
    defense: number
  ) => {
    if (!account) throw new Error("Wallet not connected");
    
    setIsLoading(true);
    try {
      const tx = new Transaction();
      
      tx.moveCall({
        target: `${ONECHAIN_CONFIG.PACKAGE_ID}::fighter_nft::create_fighter`,
        arguments: [
          tx.pure.string(name),
          tx.pure.u8(fighterType),
          tx.pure.u8(power),
          tx.pure.u8(speed),
          tx.pure.u8(defense),
        ],
      });

      tx.setGasBudget(10000000);

      const result = await signAndExecute({
        transaction: tx as any, // Type assertion to handle version mismatch
      });

      console.log("Fighter minted:", result.digest);
      return result.digest;
    } catch (error) {
      console.error("Error minting fighter:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get all fighters owned by current account
  const getMyFighters = async () => {
    if (!account) return [];
    
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: {
          StructType: `${ONECHAIN_CONFIG.PACKAGE_ID}::fighter_nft::Fighter`,
        },
        options: {
          showContent: true,
          showType: true,
        },
      });

      return objects.data;
    } catch (error) {
      console.error("Error fetching fighters:", error);
      return [];
    }
  };

  // Get fighter details
  const getFighterDetails = async (fighterId: string) => {
    try {
      const object = await suiClient.getObject({
        id: fighterId,
        options: {
          showContent: true,
        },
      });

      return object.data;
    } catch (error) {
      console.error("Error fetching fighter details:", error);
      return null;
    }
  };

  return {
    mintFighter,
    getMyFighters,
    getFighterDetails,
    isLoading,
  };
}
