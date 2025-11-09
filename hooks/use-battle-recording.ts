"use client";

import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { ONECHAIN_CONFIG } from "@/lib/onechain-config";
import { useState } from "react";

export function useBattleRecording() {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const [isLoading, setIsLoading] = useState(false);

  // Record battle result on-chain
  const recordBattle = async (
    fighterObjectId: string,
    winnerDamage: number,
    loserDamage: number,
    prizeAmount: number,
    round: number
  ) => {
    if (!account) throw new Error("Wallet not connected");
    
    setIsLoading(true);
    try {
      const tx = new Transaction();
      
      // Split coins for prize
      const [prizeCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(prizeAmount)]);
      
      tx.moveCall({
        target: `${ONECHAIN_CONFIG.PACKAGE_ID}::battle_system::record_battle`,
        arguments: [
          tx.object(fighterObjectId),
          tx.pure.u64(winnerDamage),
          tx.pure.u64(loserDamage),
          prizeCoin,
          tx.pure.u64(round),
        ],
      });

      tx.setGasBudget(20000000);

      const result = await signAndExecute({
        transaction: tx as any,
      });

      console.log("Battle recorded:", result.digest);
      return result.digest;
    } catch (error) {
      console.error("Error recording battle:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get leaderboard from blockchain events
  const getLeaderboard = async () => {
    try {
      const events = await suiClient.queryEvents({
        query: {
          MoveEventType: `${ONECHAIN_CONFIG.PACKAGE_ID}::battle_system::BattleCompleted`,
        },
        limit: 100,
        order: "descending",
      });

      // Process events to create leaderboard
      const playerStats = new Map<string, {
        address: string;
        wins: number;
        totalDamage: number;
        totalPrize: number;
        lastBattle: number;
      }>();

      events.data.forEach((event: any) => {
        const { winner, winner_damage_dealt, prize_amount, timestamp } = event.parsedJson;
        
        if (!playerStats.has(winner)) {
          playerStats.set(winner, {
            address: winner,
            wins: 0,
            totalDamage: 0,
            totalPrize: 0,
            lastBattle: 0,
          });
        }

        const stats = playerStats.get(winner)!;
        stats.wins += 1;
        stats.totalDamage += Number(winner_damage_dealt);
        stats.totalPrize += Number(prize_amount);
        stats.lastBattle = Math.max(stats.lastBattle, Number(timestamp));
      });

      // Convert to array and sort by wins
      return Array.from(playerStats.values())
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 10); // Top 10
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      return [];
    }
  };

  // Get player's battle history
  const getPlayerBattles = async (playerAddress?: string) => {
    const address = playerAddress || account?.address;
    if (!address) return [];

    try {
      const events = await suiClient.queryEvents({
        query: {
          MoveEventType: `${ONECHAIN_CONFIG.PACKAGE_ID}::battle_system::BattleCompleted`,
        },
        limit: 50,
        order: "descending",
      });

      // Filter events for this player
      return events.data.filter((event: any) => 
        event.parsedJson.winner === address
      );
    } catch (error) {
      console.error("Error fetching player battles:", error);
      return [];
    }
  };

  return {
    recordBattle,
    getLeaderboard,
    getPlayerBattles,
    isLoading,
  };
}
