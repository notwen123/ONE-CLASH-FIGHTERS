"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBattleRecording } from "@/hooks/use-battle-recording";
import { useCurrentAccount } from "@mysten/dapp-kit";

interface LeaderboardEntry {
  address: string;
  wins: number;
  totalDamage: number;
  totalPrize: number;
  lastBattle: number;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getLeaderboard } = useBattleRecording();
  const account = useCurrentAccount();

  useEffect(() => {
    if (account) {
      loadLeaderboard();
    }
  }, [account]);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatPrize = (prize: number) => {
    return (prize / 1_000_000).toFixed(3) + " OCT";
  };

  // Redirect if wallet not connected
  if (!account) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-purple-900 via-black to-red-900 p-8">
        <div className="z-10 text-center">
          <h2 className="game-title text-4xl mb-4 text-red-400">⚠️ WALLET NOT CONNECTED</h2>
          <p className="game-text text-xl text-gray-300 mb-8">Please connect your wallet to view leaderboard</p>
          <button
            onClick={() => router.push("/")}
            className="game-button px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded text-xl"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-purple-900 via-black to-red-900 p-8">
      <div className="z-10 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="game-title text-5xl text-orange-400">LEADERBOARD</h1>
          <button
            onClick={() => router.push("/")}
            className="game-button px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            BACK TO MENU
          </button>
        </div>

        {isLoading ? (
          <div className="game-text text-center text-2xl text-white">
            Loading leaderboard...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="game-text text-center text-xl text-gray-400">
            No battles recorded yet. Be the first!
          </div>
        ) : (
          <div className="bg-black/60 rounded-lg border-2 border-orange-500 overflow-hidden">
            <table className="w-full">
              <thead className="bg-orange-900/50">
                <tr className="game-text text-sm">
                  <th className="p-4 text-left">RANK</th>
                  <th className="p-4 text-left">PLAYER</th>
                  <th className="p-4 text-center">WINS</th>
                  <th className="p-4 text-center">TOTAL DAMAGE</th>
                  <th className="p-4 text-center">TOTAL PRIZE</th>
                  <th className="p-4 text-center">LAST BATTLE</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={entry.address}
                    className={`game-text text-sm border-t border-orange-900/30 ${
                      index < 3 ? "bg-yellow-900/20" : ""
                    }`}
                  >
                    <td className="p-4">
                      <span className={`text-2xl ${
                        index === 0 ? "text-yellow-400" :
                        index === 1 ? "text-gray-300" :
                        index === 2 ? "text-orange-600" :
                        "text-gray-500"
                      }`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="p-4 text-green-400 font-mono">
                      {formatAddress(entry.address)}
                    </td>
                    <td className="p-4 text-center text-white font-bold">
                      {entry.wins}
                    </td>
                    <td className="p-4 text-center text-red-400">
                      {entry.totalDamage}
                    </td>
                    <td className="p-4 text-center text-yellow-400">
                      {formatPrize(entry.totalPrize)}
                    </td>
                    <td className="p-4 text-center text-gray-400">
                      {formatDate(entry.lastBattle)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="game-text text-sm text-gray-400">
            🔗 All data fetched from OneChain blockchain
          </div>
          <div className="game-text text-xs text-gray-500 mt-2">
            Real-time rankings • Verifiable on-chain
          </div>
        </div>
      </div>
    </div>
  );
}
