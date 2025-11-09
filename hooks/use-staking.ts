"use client";

import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { ONECHAIN_CONFIG } from "@/lib/onechain-config";
import { useState } from "react";

export function useStaking() {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const [isLoading, setIsLoading] = useState(false);

  // Stake OCT for tournament entry
  const stakeForTournament = async (amount: number) => {
    if (!account) throw new Error("Wallet not connected");
    
    setIsLoading(true);
    try {
      const tx = new Transaction();
      
      // Split coins for staking
      const [stakeCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(amount)]);
      
      tx.moveCall({
        target: `${ONECHAIN_CONFIG.PACKAGE_ID}::staking_pool::stake_for_tournament`,
        arguments: [
          tx.object(ONECHAIN_CONFIG.TOURNAMENT_POOL_ID),
          stakeCoin,
        ],
      });

      tx.setGasBudget(15000000);

      const result = await signAndExecute({
        transaction: tx as any,
      });

      console.log("Staked for tournament:", result.digest);
      return result.digest;
    } catch (error) {
      console.error("Error staking:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Claim prize after winning
  const claimPrize = async () => {
    if (!account) throw new Error("Wallet not connected");
    
    setIsLoading(true);
    try {
      const tx = new Transaction();
      
      tx.moveCall({
        target: `${ONECHAIN_CONFIG.PACKAGE_ID}::staking_pool::claim_prize`,
        arguments: [
          tx.object(ONECHAIN_CONFIG.TOURNAMENT_POOL_ID),
        ],
      });

      tx.setGasBudget(15000000);

      const result = await signAndExecute({
        transaction: tx as any,
      });

      console.log("Prize claimed:", result.digest);
      return result.digest;
    } catch (error) {
      console.error("Error claiming prize:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get tournament pool stats
  const getPoolStats = async () => {
    try {
      const pool = await suiClient.getObject({
        id: ONECHAIN_CONFIG.TOURNAMENT_POOL_ID,
        options: {
          showContent: true,
        },
      });

      if (pool.data?.content?.dataType === "moveObject") {
        const fields = pool.data.content.fields as any;
        return {
          totalStaked: Number(fields.total_staked || 0),
          prizePool: Number(fields.prize_pool || 0),
          entryFee: Number(fields.entry_fee || 0),
          active: Boolean(fields.active),
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching pool stats:", error);
      return null;
    }
  };

  return {
    stakeForTournament,
    claimPrize,
    getPoolStats,
    isLoading,
  };
}
