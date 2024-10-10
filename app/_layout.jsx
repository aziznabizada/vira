import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { I18nManager } from "react-native";

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
    </>
  );
};

export default RootLayout;
