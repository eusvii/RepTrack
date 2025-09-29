import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  Roboto_400Regular,
  Roboto_600SemiBold,
  Roboto_700Bold,
  useFonts
} from "@expo-google-fonts/roboto";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default () => {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_600SemiBold,
    Roboto_700Bold
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "RepTrack",
            headerTitleStyle: {
              fontFamily: "Roboto_600SemiBold",
              fontSize: 20,
              color: "#555555"
            }
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
};
