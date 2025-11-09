"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStaking } from "@/hooks/use-staking";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ONECHAIN_CONFIG } from "@/lib/onechain-config";

export default function StakingPage() {
  const router = useRouter();
  const account = useCurrentAccount();
  const { stakeForTournament, getPoolStats, isLoading } = useStaking();
  
  const [poolStats, setPoolStats] = useState<any>(null);
  const [selectedAmount, setSelectedAmount] = useState(10_000_000); // 0.01 OCT
  const [isStaking, setIsStaking] = useState(false);

  useEffect(() => {
    loadPoolStats();
  }, []);

  const loadPoolStats = async () => {
    const stats = await getPoolStats();
    setPoolStats(stats);
  };

  const handleStake = async () => {
    if (!account || isStaking) return;
    
    setIsStaking(true);
    try {
      await stakeForTournament(selectedAmount);
      alert("Staked successfully! ✅");
      await loadPoolStats();
    } catch (error) {
      console.error("Staking failed:", error);
      alert("Failed to stake. Please try again.");
    } finally {
      setIsStaking(false);
    }
  };

  const formatOCT = (amount: number) => {
    return (amount / 1_000_000).toFixed(3) + " OCT";
  };

  const stakeOptions = [
    { label: "Small Entry", amount: 10_000_000, oct: "0.01 OCT" },
    { label: "Medium Entry", amount: 50_000_000, oct: "0.05 OCT" },
    { label: "Large Entry", amount: 100_000_000, oct: "0.1 OCT" },
  ];

  // Redirect if wallet not connected
  if (!account) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-to-b from-purple-900 via-black to-red-900 p-8 flex items-center justify-center">
        <div className="z-10 text-center">
          <h2 className="game-title text-4xl mb-4 text-red-400">⚠️ WALLET NOT CONNECTED</h2>
          <p className="game-text text-xl text-gray-300 mb-8">Please connect your wallet to stake</p>
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
    <div className="relative w-full min-h-screen bg-gradient-to-b from-purple-900 via-black to-red-900 p-8 overflow-y-auto">
      <div className="z-10 w-full max-w-4xl mx-auto pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="game-title text-5xl text-orange-400">TOURNAMENT STAKING</h1>
          <button
            onClick={() => router.push("/")}
            className="game-button px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            BACK TO MENU
          </button>
        </div>

        <div className="space-y-6">
            {/* Pool Stats */}
            <div className="bg-black/60 rounded-lg border-2 border-orange-500 p-6">
              <h2 className="game-text text-2xl text-orange-400 mb-4">PRIZE POOL</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded">
                  <div className="game-text text-sm text-gray-400">Total Staked</div>
                  <div className="game-text text-2xl text-yellow-400">
                    {poolStats ? formatOCT(poolStats.totalStaked) : "Loading..."}
                  </div>
                </div>
                <div className="bg-orange-900/20 p-4 rounded">
                  <div className="game-text text-sm text-gray-400">Prize Pool</div>
                  <div className="game-text text-2xl text-green-400">
                    {poolStats ? formatOCT(poolStats.prizePool) : "Loading..."}
                  </div>
                </div>
              </div>
            </div>

            {/* Stake Options */}
            <div className="bg-black/60 rounded-lg border-2 border-orange-500 p-6">
              <h2 className="game-text text-2xl text-orange-400 mb-4">SELECT ENTRY FEE</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stakeOptions.map((option) => (
                  <button
                    key={option.amount}
                    onClick={() => setSelectedAmount(option.amount)}
                    className={`game-button p-4 rounded border-2 transition-all ${
                      selectedAmount === option.amount
                        ? "border-green-400 bg-green-900/30"
                        : "border-gray-600 bg-gray-900/30 hover:border-orange-400"
                    }`}
                  >
                    <div className="game-text text-sm text-gray-400">{option.label}</div>
                    <div className="game-text text-xl text-white">{option.oct}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleStake}
                disabled={isStaking || !poolStats}
                className="w-full game-button px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xl rounded"
              >
                {isStaking ? "STAKING..." : "STAKE FOR TOURNAMENT"}
              </button>
            </div>

            {/* Info */}
            <div className="bg-black/60 rounded-lg border-2 border-blue-500 p-6">
              <h2 className="game-text text-xl text-blue-400 mb-3">ℹ️ HOW IT WORKS</h2>
              <div className="game-text text-sm text-gray-300 space-y-2">
                <p>• Stake OCT to enter the tournament prize pool</p>
                <p>• Win battles to increase your chances of winning</p>
                <p>• 90% of the pool goes to winners, 10% burned for APY</p>
                <p>• Record your victories on-chain to claim prizes</p>
                <p>• Higher stakes = bigger prize pools!</p>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="text-center">
              <div className="game-text text-sm text-gray-400">
                🔗 All stakes secured on OneChain blockchain
              </div>
              <div className="game-text text-xs text-gray-500 mt-2">
                Transparent • Verifiable • Decentralized
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
