"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type SoundContextType = {
  isMuted: boolean
  toggleMute: () => void
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
})

export const useSoundContext = () => useContext(SoundContext)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Background music disabled - add your own MP3 file to /public/sounds/background-music.mp3
    // Uncomment below when you have the audio file:
    
    // const audioElement = new Audio("/sounds/background-music.mp3")
    // audioElement.loop = true
    // audioElement.volume = 0.3 // Set volume to 30%
    // setAudio(audioElement)

    // Clean up on unmount
    return () => {
      // if (audioElement) {
      //   audioElement.pause()
      //   audioElement.src = ""
      // }
    }
  }, [])

  useEffect(() => {
    if (!audio) return

    if (isMuted) {
      audio.pause()
    } else {
      // Only play if the document has been interacted with
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented, we'll need user interaction
          console.log("One Clash Fighters: Audio playback was prevented:", error)
        })
      }
    }
  }, [audio, isMuted])

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  return <SoundContext.Provider value={{ isMuted, toggleMute }}>{children}</SoundContext.Provider>
}
