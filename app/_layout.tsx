import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Spinner } from "@/components/ui/spinner";
import {
  Roboto_400Regular,
  Roboto_600SemiBold,
  Roboto_700Bold,
  useFonts
} from "@expo-google-fonts/roboto";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default () => {
  const [fontloaded, fonterror] = useFonts({
    Roboto_400Regular,
    Roboto_600SemiBold,
    Roboto_700Bold
  });

  useEffect(() => {
    if (fontloaded || fonterror) {
      SplashScreen.hideAsync();
    }
  }, [fontloaded, fonterror]);

  if (!fontloaded && !fonterror) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Spinner size="large" color="#3b3b3b" />
      </View>
    );
  }

  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Workout Tracker",
            headerTitleStyle: { fontFamily: "Roboto_600SemiBold" }
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
};
