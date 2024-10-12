// app/[id].jsx

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import storiesData from "../../assets/data/strories.json"; // Adjust the path to your JSON file
import { Ionicons } from "@expo/vector-icons";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "./../../utils/favoritesStorage";
import { Audio } from "expo-av";
import { useAudio } from "../../context/AudioContext";

import { Audio } from "expo-av";

// Create a mapping for images
const images = {
  "image1.png": require("../../assets/story-images/image1.png"),
  "image2.png": require("../../assets/story-images/image2.png"),
  "image3.png": require("../../assets/story-images/image3.png"),
  "image4.png": require("../../assets/story-images/image4.png"),
  "image5.png": require("../../assets/story-images/image5.png"),
  "image6.png": require("../../assets/story-images/image6.png"),
  "image7.png": require("../../assets/story-images/image7.png"),
  "image8.png": require("../../assets/story-images/image8.png"),
  "image9.png": require("../../assets/story-images/image9.png"),
  "image10.png": require("../../assets/story-images/image10.png"),
  "image11.png": require("../../assets/story-images/image11.png"),
};

const audioFiles = {
  "audio1.mp3": require("../../assets/audio/audio1.mp3"),
  "audio2.mp3": require("../../assets/audio/audio2.mp3"),
  "audio3.mp3": require("../../assets/audio/audio3.mp3"),
  "audio4.mp3": require("../../assets/audio/audio4.mp3"),
  "audio5.mp3": require("../../assets/audio/audio5.mp3"),
  "audio6.mp3": require("../../assets/audio/audio6.mp3"),
  "audio7.mp3": require("../../assets/audio/audio7.mp3"),
  "audio8.mp3": require("../../assets/audio/audio8.mp3"),
  "audio9.mp3": require("../../assets/audio/audio9.mp3"),
  "audio10.mp3": require("../../assets/audio/audio10.mp3"),
  "audio11.mp3": require("../../assets/audio/audio11.mp3"),
};

const StoryDetail = () => {
  const { id } = useLocalSearchParams(); // Get the ID from the URL
  const router = useRouter();
  const { playSound, pauseSound, stopSound, isPlaying } = useAudio();
  const navigation = useNavigation(); // Get the navigation object
  const [favorite, setFavorite] = useState(false);

  const [sound, setSound] = useState();

  const story = storiesData.find((story) => story.id === id); // Find the story by ID
  const imageSource = images[story.image]; // Access the image using the mapping

  const playAudio = async () => {
    await soundRef.current.playAsync();
    setIsPlaying(true);
  };

  const pauseAudio = async () => {
    await soundRef.current.pauseAsync();
    setIsPlaying(false);
  };
  useEffect(() => {
    loadAudio();

    return () => {
      soundRef.current.unloadAsync(); // Unload audio on unmount
    };
  }, []);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const result = await isFavorite(story.id);
      setFavorite(result);
    };
    loadAudio();
    checkFavoriteStatus();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [story.id]);

  useEffect(() => {
    // Stop any playing audio when component unmounts or id changes
    return () => {
      stopSound();
    };
  }, [id]);

  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(audioFiles[story.audio]);

      setSound(sound);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };
  const handlePlayPause = async () => {
    if (isPlaying) {
      await pauseSound();
    } else {
      await playSound(audioFiles[story.audio]);
    }
  };

  const handleNext = async () => {
    await stopSound();
    const currentId = parseInt(id);
    let nextId = currentId + 1;

    // Assuming you have 11 stories, adjust this number if needed
    const totalStories = 11;

    // If we've reached the end, cycle back to the first story
    if (nextId > totalStories) {
      nextId = 1;
    }

    // Navigate to the next story (or back to the first)
    router.push(`/stories/${nextId}`);
  };

  const handlePrevious = async () => {
    await stopSound();
    const currentId = parseInt(id);
    let prevId = currentId - 1;

    // Assuming you have 11 stories, adjust this number if needed
    const totalStories = 11;

    // If we've reached the beginning, cycle to the last story
    if (prevId < 1) {
      prevId = totalStories;
    }

    // Navigate to the previous story (or to the last if we're at the first)
    router.push(`/stories/${prevId}`);
  };

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(story.id);
    } else {
      await addFavorite(story);
    }
    setFavorite(!favorite);
  };

  // Set the header title and styles when the component mounts
  useLayoutEffect(() => {
    if (story) {
      navigation.setOptions({
        title: "",
        headerLeft: () => (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}
            className="bg-white"
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color="black"
              className="font-vregular"
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
            className="bg-white"
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={24}
              color="#FF9C01"
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, story, favorite]);

  if (!story) {
    return (
      <View>
        <Text>Story not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource} // Use require if images are local
          style={{ width: "100%", height: 300 }}
        />
        <View style={styles.audioContainer} className="bg-secondary-100">
          {/* Previous Button */}
          <TouchableOpacity onPress={handleNext}>
            <Ionicons name="play-forward" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePlayPause}
            style={{ marginHorizontal: 16 }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity onPress={handlePrevious}>
            <Ionicons name="play-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.titleContainer} className="pb-0">
        <View>
          {/* Author */}
          <Text style={styles.title}>{story.title}</Text>
          <Text className="text-sm text-gray-500 mt-1 text-left">
            نویسنده: {story.author}
          </Text>
        </View>
      </View>
      <View className="px-4">
        <Text style={{ fontSize: 16 }}>{story.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  audioContainer: {
    position: "absolute", // Position it absolutely within the parent container
    bottom: -28, // Position it 10 units from the bottom
    left: 65, // Center it horizontally
    right: 65,
    // transform: [{ translateX: -30 }], // Offset to truly center (adjust based on container width)
    flexDirection: "row", // Row layout for left, play/pause, and right buttons
    alignItems: "center", // Center items vertically
    justifyContent: "space-around",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    gap: 30,
  },
  titleContainer: {
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Space out the title and icon
    alignItems: "center", // Center items vertically
    padding: 16, // Padding around the title container
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  favoriteButton: {
    width: 35,
    height: 35,
    borderRadius: 25, // Round shape
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 25, // Round shape
    justifyContent: "center",
    alignItems: "center",
  },
  storyContent: {
    marginTop: "20px",
  },
});

export default StoryDetail;
