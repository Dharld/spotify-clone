import { createContext, useContext, useEffect, useState } from "react";

// Create a new context for the player API
const PlayerContext = createContext();

// Custom hook to access the player API
export function usePlayer() {
  return useContext(PlayerContext);
}

// Provider component to wrap your app and provide the player API
export function PlayerProvider({ children }) {
  // Initialize the media player
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio, _] = useState(new Audio());

  useEffect(() => {
    if (currentTrack) {
      audio.src = currentTrack.previewUrl;
      play();
    }
  }, [currentTrack, audio]);

  function play() {
    currentTrack && audio.play();
  }

  function pause() {
    audio.pause();
  }

  function getCurrentTrack() {
    return currentTrack;
  }

  // Provide the player API to the children components
  return (
    <PlayerContext.Provider
      value={{ play, pause, setCurrentTrack, getCurrentTrack }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
