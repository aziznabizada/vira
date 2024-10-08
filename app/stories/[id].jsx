// app/[id].jsx

import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import storiesData from "../../assets/data/strories.json"; // Adjust the path to your JSON file
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "./../../utils/favoritesStorage";

const adventureImage = require("../../assets/story-images/roba-khargoosh.png");

// Create a mapping for images
const images = {
  "roba-khargoosh.png": adventureImage,
};

const StoryDetail = () => {
  const { id } = useLocalSearchParams(); // Get the ID from the URL
  const navigation = useNavigation(); // Get the navigation object
  const [favorite, setFavorite] = useState(false);

  const [isPlaying, setIsPlaying] = useState();

  const story = storiesData.find((story) => story.id === id); // Find the story by ID
  const imageSource = images[story.image]; // Access the image using the mapping

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const result = await isFavorite(story.id);
      setFavorite(result);
    };
    checkFavoriteStatus();
  }, [story.id]);

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
            onPress={() => navigation.goBack()}
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
          <TouchableOpacity
          // onPress={handlePrevious}
          >
            <Ionicons name="play-forward" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Play/Pause Button */}
          <TouchableOpacity
            // onPress={handlePlayPause}
            style={{ marginHorizontal: 16 }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
          // onPress={handleNext}
          >
            <Ionicons name="play-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.titleContainer}>
        {/* <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(story.id)}
        >
          <Ionicons
            name={favorites.includes(story.id) ? "heart" : "heart-outline"}
            size={28}
            color="#FF8E01"
          />
        </TouchableOpacity> */}
        <View>
          {/* Author */}
          <Text style={styles.title}>{story.title}</Text>
          <Text className="text-sm text-gray-500 mt-1 text-right">
            نویسنده: {story.author}
          </Text>
        </View>
      </View>
      <View className="px-4">
        <Text style={{ marginVertical: 10 }}>{story.description}</Text>
        <Text style={{ marginVertical: 10 }}>{story.content}</Text>
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
