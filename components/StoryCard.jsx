import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { images } from "../assets/images";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "./../utils/favoritesStorage";
// import { Ionicons } from "@expo/vector-icons";

// Create a mapping for images

const StoryCard = ({ story }) => {
  const [favorite, setFavorite] = useState(false);

  const imageSource = images[story.image]; // Access the image using the mapping
  const router = useRouter();

  const handlePress = () => {
    router.push(`/stories/${story.id}`); // Navigate to the story details page
  };

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

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white  rounded-xl overflow-hidden shadow-lg m-4"
    >
      {/* Conditional Rendering for Image */}
      {imageSource && (
        <Image
          source={imageSource}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}

      {/* Story Content */}
      <View className="p-4 flex-row justify-between items-center">
        <View>
          <Text className="text-xl font-vsemibold text-gray-800">
            {story.title}
          </Text>

          <Text className="text-sm text-gray-500 mt-1">
            نویسنده: {story.author}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          className="bg-white"
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={28}
            color="#FF9C01"
          />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default StoryCard;

const styles = StyleSheet.create({
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
});
