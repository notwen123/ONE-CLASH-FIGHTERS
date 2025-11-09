"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WalletConnect } from "@/components/wallet-connect"
import { useCurrentAccount } from "@mysten/dapp-kit"

export default function IntroScreen() {
  const router = useRouter()
  const [showStart, setShowStart] = useState(true)
  const account = useCurrentAccount()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        router.push(`/select`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Wallet Address - Top Right (only when connected) */}
      {account && (
        <div className="absolute top-4 right-4 z-20">
          <WalletConnect />
        </div>
      )}

      {/* Clean background without old game name */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-red-900 via-black to-orange-900">
        {/* City skyline background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-800 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-16 h-24 bg-gray-700 opacity-60"></div>
          <div className="absolute bottom-0 left-20 w-12 h-32 bg-gray-600 opacity-50"></div>
          <div className="absolute bottom-0 left-36 w-20 h-28 bg-gray-700 opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-16 h-24 bg-gray-700 opacity-60"></div>
          <div className="absolute bottom-0 right-20 w-12 h-32 bg-gray-600 opacity-50"></div>
          <div className="absolute bottom-0 right-36 w-20 h-28 bg-gray-700 opacity-60"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      <div className="z-10 flex flex-col items-center justify-center space-y-8">
        {/* Game title */}
        <div className="z-10 text-center">
          <h1 className="game-title text-8xl mb-4 drop-shadow-2xl">ONE CLASH</h1>
          <h1 className="game-title text-8xl mb-8 drop-shadow-2xl">FIGHTERS</h1>
          <p className="game-text text-xl text-orange-300 drop-shadow-lg">ULTIMATE FIGHTING CHAMPIONSHIP</p>
        </div>

        {/* Show Connect Wallet if not connected */}
        {!account ? (
          <div className="z-10 mt-16 flex flex-col items-center gap-6">
            <div className="game-text text-white text-xl drop-shadow-lg">
              Connect your wallet to start playing
            </div>
            <WalletConnect />
            <div className="game-text text-sm text-gray-400 mt-4">
               OneChain Testnet • Play-to-Earn • NFT Fighters
            </div>
          </div>
        ) : (
          <>
            {/* Start prompt - Only when connected */}
            <div className={`game-text text-white text-2xl mt-16 drop-shadow-lg ${showStart ? "blink" : ""}`}>
              Press ENTER to Start
            </div>

            {/* Navigation Buttons - Only when connected */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => router.push("/profile")}
                className="game-button px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                 PROFILE
              </button>
              <button
                onClick={() => router.push("/leaderboard")}
                className="game-button px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded"
              >
                 LEADERBOARD
              </button>
              <button
                onClick={() => router.push("/staking")}
                className="game-button px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                 STAKE
              </button>
            </div>
          </>
        )}

        {/* Game info */}
        <div className="absolute bottom-8 left-8 game-text text-sm text-gray-400">
          <p>Use Arrow Keys to Move</p>
          <p>A = Kick | S = Defense | D = Punch</p>
        </div>

        {/* Version info */}
        <div className="absolute bottom-8 right-8 game-text text-xs text-gray-500">
          <p>One Clash Fighters v1.0</p>
          <p className="text-orange-400">OneChain GameFi</p>
        </div>
      </div>
    </div>
  )
}
