import React, { createContext, useState, useContext, useEffect } from "react";
import { Audio } from "expo-av";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [globalSound, setGlobalSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async (soundFile) => {
    // If there's already a sound playing, stop and unload it
    if (globalSound) {
      await globalSound.stopAsync();
      await globalSound.unloadAsync();
    }

    // Load and play the new sound
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setGlobalSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
  };

  const pauseSound = async () => {
    if (globalSound) {
      await globalSound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopSound = async () => {
    if (globalSound) {
      await globalSound.stopAsync();
      await globalSound.unloadAsync();
      setGlobalSound(null);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (globalSound) {
        globalSound.unloadAsync();
      }
    };
  }, [globalSound]);

  return (
    <AudioContext.Provider
      value={{
        playSound,
        pauseSound,
        stopSound,
        isPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
