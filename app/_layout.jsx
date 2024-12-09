import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { I18nManager, NativeModules } from "react-native";
import { AudioProvider } from "../context/AudioContext";
import { ThemeProvider } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "BKoodak-Bold": require("../assets/fonts/BKoodak-Bold.ttf"),
    "BKoodak-Outline": require("../assets/fonts/BKoodak-Outline.ttf"),
    koodak: require("../assets/fonts/koodak.ttf"),
    dastan: require("../assets/fonts/dastan.ttf"),
  });

  useEffect(() => {
    const setupRTL = () => {
      if (!I18nManager.isRTL) {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);

        // Reload the app after setting RTL
        NativeModules.DevSettings.reload();
      }

      // Hide the splash screen after fonts are loaded
      if (fontsLoaded) {
        // Add 4-second delay before hiding the splash screen
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 4000);
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
