import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <BottomTabNavigator />;
}
