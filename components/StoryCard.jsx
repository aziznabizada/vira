import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
const adventureImage = require("../assets/story-images/roba-khargoosh.png");

// Create a mapping for images
const images = {
  "roba-khargoosh.png": adventureImage,
};

const StoryCard = ({ story }) => {
  const imageSource = images[story.image]; // Access the image using the mapping
  const router = useRouter();

  const handlePress = () => {
    router.push(`/stories/${story.id}`); // Navigate to the story details page
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
      <View className="p-4">
        {/* Title */}
        <Text className="text-xl font-vsemibold text-gray-800 text-right">
          {story.title}
        </Text>
        {/* Author */}
        <Text className="text-sm text-gray-500 mt-1 text-right">
          نویسنده: {story.author}
        </Text>
        {/* Short Description */}
        {/* <Text className="text-gray-600 mt-2 text-base text-right">
          {story.description}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default StoryCard;
