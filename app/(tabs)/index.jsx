import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import stories from "../../assets/data/strories.json";
import { StoryCard } from "../../components";

import { useAudio } from "../../context/AudioContext";

const StoryList = () => {
  const { stopSound } = useAudio();

  useEffect(() => {
    stopSound();
  }, []);

  return (
    <SafeAreaView className="font-bkoodakbold">
      <ScrollView className="px-2 py-0">
        {stories.map((story, key) => {
          return <StoryCard story={story} key={key} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoryList;
