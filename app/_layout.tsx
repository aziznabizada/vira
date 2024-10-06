import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";
import { I18nManager } from "react-native";
import { FavoritesProvider } from "../context/FavoritesContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Vazirmatn-Black": require("../assets/fonts/Vazirmatn-Black.ttf"),
    "Vazirmatn-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
    "Vazirmatn-ExtraBold": require("../assets/fonts/Vazirmatn-ExtraBold.ttf"),
    "Vazirmatn-ExtraLight": require("../assets/fonts/Vazirmatn-ExtraLight.ttf"),
    "Vazirmatn-Light": require("../assets/fonts/Vazirmatn-Light.ttf"),
    "Vazirmatn-Medium": require("../assets/fonts/Vazirmatn-Medium.ttf"),
    "Vazirmatn-Regular": require("../assets/fonts/Vazirmatn-Regular.ttf"),
    "Vazirmatn-SemiBold": require("../assets/fonts/Vazirmatn-SemiBold.ttf"),
    "Vazirmatn-Thin": require("../assets/fonts/Vazirmatn-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
      return;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    I18nManager.forceRTL(true); // Enable RTL layout globally
    I18nManager.allowRTL(true); // Allow switching between LTR and RTL
  }, []);

  if (!fontsLoaded) {
    return null; // Ensure no rendering until fonts are loaded
  }

  return (
    <FavoritesProvider>
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
        {/* Additional screens can go here */}
      </Stack>
    </FavoritesProvider>
  );
};

export default RootLayout;
