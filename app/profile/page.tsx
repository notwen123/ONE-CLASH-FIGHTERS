"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useFighterNFT } from "@/hooks/use-fighter-nft";
import { useBattleRecording } from "@/hooks/use-battle-recording";
import Image from "next/image";
import { fighters } from "@/lib/fighters";

export default function ProfilePage() {
  const router = useRouter();
  const account = useCurrentAccount();
  const { getMyFighters, getFighterDetails } = useFighterNFT();
  const { getPlayerBattles } = useBattleRecording();
  
  const [fighter, setFighter] = useState<any>(null);
  const [battles, setBattles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (account) {
      loadProfile();
    }
  }, [account]);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      // Get owned fighters
      const fighters = await getMyFighters();
      console.log("Fighters found:", fighters);
      
      if (fighters && fighters.length > 0) {
        const fighterId = fighters[0].data?.objectId;
        if (fighterId) {
          const details = await getFighterDetails(fighterId);
          console.log("Fighter details:", details);
          
          // Extract fighter data from content
          if (details?.content && 'fields' in details.content) {
            setFighter({
              id: fighterId,
              ...details.content.fields
            });
          }
        }
      }

      // Get battle history
      const history = await getPlayerBattles(account!.address);
      console.log("Battle history:", history);
      setBattles(history);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if wallet not connected
  if (!account) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-to-b from-purple-900 via-black to-red-900 p-8 flex items-center justify-center">
        <div className="z-10 text-center">
          <h2 className="game-title text-4xl mb-4 text-red-400"> WALLET NOT CONNECTED</h2>
          <p className="game-text text-xl text-gray-300 mb-8">Please connect your wallet to view profile</p>
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
      <div className="z-10 w-full max-w-6xl mx-auto pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="game-title text-5xl text-orange-400">MY PROFILE</h1>
          <button
            onClick={() => router.push("/")}
            className="game-button px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            BACK TO MENU
          </button>
        </div>

        {isLoading ? (
          <div className="text-center game-text text-2xl text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fighter Card */}
            <div className="bg-black/60 rounded-lg border-2 border-orange-500 p-6">
              <h2 className="game-text text-2xl text-orange-400 mb-4">MY FIGHTER</h2>
              
              {fighter ? (
                <div className="space-y-4">
                  <div className="relative w-full h-64 bg-gradient-to-b from-orange-900/20 to-black rounded-lg flex items-center justify-center overflow-hidden">
                    {fighter.fighter_type !== undefined && fighters[fighter.fighter_type] ? (
                      <Image
                        src={fighters[fighter.fighter_type].portrait}
                        alt={fighters[fighter.fighter_type].name}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    ) : (
                      <div className="text-6xl">🥊</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="game-text text-sm text-gray-400">Name:</span>
                      <span className="game-text text-sm text-white">{String.fromCharCode(...(fighter.name || []))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="game-text text-sm text-gray-400">Fighter Type:</span>
                      <span className="game-text text-sm text-white">
                        {fighter.fighter_type !== undefined && fighters[fighter.fighter_type] 
                          ? fighters[fighter.fighter_type].name 
                          : `Type ${fighter.fighter_type}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="game-text text-sm text-gray-400">Level:</span>
                      <span className="game-text text-sm text-yellow-400">{fighter.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="game-text text-sm text-gray-400">Wins:</span>
                      <span className="game-text text-sm text-green-400">{fighter.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="game-text text-sm text-gray-400">Losses:</span>
                      <span className="game-text text-sm text-red-400">{fighter.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="game-text text-sm text-gray-400">Total Damage Dealt:</span>
                      <span className="game-text text-sm text-orange-400">{fighter.total_damage_dealt}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-orange-900/20 rounded">
                    <div className="game-text text-xs text-gray-400 mb-2">Stats</div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="game-text text-gray-400">Power</span>
                          <span className="game-text text-white">{fighter.power}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded h-2">
                          <div className="bg-red-500 h-2 rounded" style={{ width: `${(fighter.power / 15) * 100}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="game-text text-gray-400">Speed</span>
                          <span className="game-text text-white">{fighter.speed}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded h-2">
                          <div className="bg-blue-500 h-2 rounded" style={{ width: `${(fighter.speed / 15) * 100}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="game-text text-gray-400">Defense</span>
                          <span className="game-text text-white">{fighter.defense}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded h-2">
                          <div className="bg-green-500 h-2 rounded" style={{ width: `${(fighter.defense / 15) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="game-text text-xs text-gray-500">
                      NFT ID: {typeof fighter.id === 'string' ? `${fighter.id.slice(0, 8)}...${fighter.id.slice(-6)}` : 'Unknown'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="game-text text-xl text-gray-400 mb-4">No Fighter Minted</div>
                  <button
                    onClick={() => router.push("/select")}
                    className="game-button px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded"
                  >
                    Mint Fighter
                  </button>
                </div>
              )}
            </div>

            {/* Battle History */}
            <div className="bg-black/60 rounded-lg border-2 border-blue-500 p-6">
              <h2 className="game-text text-2xl text-blue-400 mb-4">BATTLE HISTORY</h2>
              
              {battles.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {battles.map((battle, index) => (
                    <div key={index} className="bg-blue-900/20 p-4 rounded border border-blue-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`game-text text-sm ${battle.won ? 'text-green-400' : 'text-red-400'}`}>
                          {battle.won ? '✓ VICTORY' : '✗ DEFEAT'}
                        </span>
                        <span className="game-text text-xs text-gray-400">
                          {new Date(battle.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="game-text text-gray-400">Damage:</span>
                          <span className="game-text text-white ml-2">{battle.damage}</span>
                        </div>
                        <div>
                          <span className="game-text text-gray-400">Prize:</span>
                          <span className="game-text text-yellow-400 ml-2">
                            {(battle.prize / 1_000_000).toFixed(3)} OCT
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="game-text text-xl text-gray-400 mb-4">No Battles Yet</div>
                  <div className="game-text text-sm text-gray-500">
                    Start fighting to build your battle history!
                  </div>
                </div>
              )}
            </div>

            {/* Wallet Info */}
            <div className="bg-black/60 rounded-lg border-2 border-green-500 p-6 lg:col-span-2">
              <h2 className="game-text text-2xl text-green-400 mb-4">WALLET INFO</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded">
                  <div className="game-text text-xs text-gray-400 mb-2">Address</div>
                  <div className="game-text text-sm text-white font-mono">
                    {account.address.slice(0, 10)}...{account.address.slice(-8)}
                  </div>
                </div>
                <div className="bg-green-900/20 p-4 rounded">
                  <div className="game-text text-xs text-gray-400 mb-2">Network</div>
                  <div className="game-text text-sm text-green-400">OneChain Testnet</div>
                </div>
                <div className="bg-green-900/20 p-4 rounded">
                  <div className="game-text text-xs text-gray-400 mb-2">Status</div>
                  <div className="game-text text-sm text-green-400">✓ Connected</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
