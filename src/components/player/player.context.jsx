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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (currentTrack) {
      setElapsedTime(0);
      audio.src = currentTrack.previewUrl;
      play();
    }
  }, [currentTrack, audio]);

  function play() {
    if (currentTrack) {
      audio.play();
      // Clear any existing interval
      if (intervalId) {
        setElapsedTime(0);
        clearInterval(intervalId);
      }
      // Start a new interval
      const id = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (prevTime >= Math.floor(audio.duration)) {
            // If the elapsed time is greater than or equal to the duration,
            // clear the interval and return the current time without incrementing it
            clearInterval(id);
            return prevTime;
          } else {
            // Otherwise, increment the elapsed time
            return prevTime + 0.017;
          }
        });
      }, 17);
      setIntervalId(id);
    }
  }

  function pause() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    audio.pause();
  }

  function getCurrentTrack() {
    return currentTrack;
  }

  function getAudioResource() {
    return audio;
  }

  function getElapsedTime() {
    return elapsedTime;
  }
  // Provide the player API to the children components
  return (
    <PlayerContext.Provider
      value={{
        play,
        pause,
        setCurrentTrack,
        getCurrentTrack,
        getAudioResource,
        getElapsedTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
