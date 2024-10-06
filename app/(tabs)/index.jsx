import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import stories from "../../assets/data/strories.json";

import StoryCard from "../../components/StoryCard";

const StoryList = () => {
  return (
    <SafeAreaView className="font-vregular">
      <ScrollView className="px-2 py-0">
        {stories.map((story, key) => {
          return <StoryCard story={story} key={key} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoryList;
