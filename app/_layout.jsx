import React, { useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { I18nManager } from "react-native";
import { AudioProvider } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "BKoodak-Bold": require("../assets/fonts/BKoodak-Bold.ttf"),
    "BKoodak-Outline": require("../assets/fonts/BKoodak-Outline.ttf"),
    koodak: require("../assets/fonts/koodak.ttf"),
    dastan: require("../assets/fonts/dastan.ttf"),
  });
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const setupRTL = () => {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);

        // Hide splash screen after RTL is applied
      }

      // Hide the splash screen after fonts are loaded
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    };
    setupRTL();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Wait until fonts are loaded
  }
  return (
    <>
      <ThemeProvider>
        <AudioProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="stories/[id]"
              options={{
                headerShown: true,
                headerTitle: "",
                headerTransparent: true,
              }}
            />
          </Stack>
        </AudioProvider>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
