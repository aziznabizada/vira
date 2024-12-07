import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import Favorites from "./favorite";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className="font-bkoodakbold text-xs" style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#333333",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#dddddd",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Story",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons?.story}
                color={color}
                name="داستان"
                className="font-bkoodakbold"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorite",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons?.favorite}
                color={color}
                className="font-bkoodakbold"
                name="مورد علاقه"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons?.home}
                color={color}
                className="font-bkoodakbold"
                name="در باره ما"
                focused={focused}
              />
            ),
          }}
          components={Favorites}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </>
  );
};

export default TabLayout;
