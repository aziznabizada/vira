import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const AudioPlayer = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/1.mp3") // Change the path to your audio file
    );
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);
  }

  async function stopSound() {
    await sound.stopAsync();
    setIsPlaying(false);
  }

  // Cleanup function to unload sound
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Player</Text>
      <Button
        title={isPlaying ? "Stop" : "Play"}
        onPress={isPlaying ? stopSound : playSound}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AudioPlayer;
