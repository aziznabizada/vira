import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image } from "react-native";
import stories from "../../assets/data/strories.json"; // Adjust the path if necessary

const StoriesApp = () => {
  const [storyList, setStoryList] = useState([]);

  // Load stories data when the component mounts
  useEffect(() => {
    setStoryList(stories);
  }, []);

  return (
    <View className="p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Stories List</Text>
      <FlatList
        data={storyList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-6 p-4 bg-white rounded-lg shadow">
            <Text className="text-xl font-bold mb-2">{item.title}</Text>
            <Text className="text-gray-600">{item.description}</Text>
            <Image
              source={{ uri: item.image }}
              className="w-full h-48 rounded-lg mt-4"
              resizeMode="cover"
            />
            <Text className="mt-4 text-base text-gray-700">{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default StoriesApp;
