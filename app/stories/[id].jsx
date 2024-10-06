// app/[id].jsx

import React, { useEffect, useLayoutEffect } from "react";
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
import { useFavorites } from "../../context/FavoritesContext";

const adventureImage = require("../../assets/story-images/roba-khargoosh.png");

// Create a mapping for images
const images = {
  "roba-khargoosh.png": adventureImage,
};

const StoryDetail = () => {
  const { id } = useLocalSearchParams(); // Get the ID from the URL
  const navigation = useNavigation(); // Get the navigation object
  const { favorites, toggleFavorite } = useFavorites(); // Use favorites context
  const story = storiesData.find((story) => story.id === id); // Find the story by ID
  const imageSource = images[story.image]; // Access the image using the mapping

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          toggleFavorite(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };
    loadFavorites();
  }, []);

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
      });
    }
  }, [navigation, story]);

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
          style={{ width: "100%", height: 350 }}
          color={favorites.includes(story.id) ? "red" : "gray"}
        />
      </View>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(story.id)}
        >
          <Ionicons
            name={favorites.includes(story.id) ? "heart" : "heart-outline"}
            size={28}
            color="#FF8E01"
          />
        </TouchableOpacity>
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
    position: "relative", // Set position to relative for the parent container
  },
  image: {
    width: "100%",
    height: 400,
  },
  titleContainer: {
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Space out the title and icon
    alignItems: "center", // Center items vertically
    padding: 16, // Padding around the title container
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  favoriteButton: {
    borderRadius: 25,
    padding: 2, // Optional: padding for better touch area
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 25, // Round shape
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StoryDetail;
